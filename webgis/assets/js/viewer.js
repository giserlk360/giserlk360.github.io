/**
 * Viewer Page Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  const viewer = {
    isCodePanelVisible: false,

    // 设置带时效性的localStorage
    setItemWithExpiry(key, value, expiryInMinutes = 60) {
      const now = new Date();
      const item = {
        value: value,
        expiry: now.getTime() + expiryInMinutes * 60 * 1000,
      };
      localStorage.setItem(key, JSON.stringify(item));
    },

    // 获取带时效性的localStorage
    getItemWithExpiry(key) {
      const itemStr = localStorage.getItem(key);
      if (!itemStr) {
        return null;
      }

      const item = JSON.parse(itemStr);
      const now = new Date();

      if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
      }
      return item.value;
    },

    async init() {
      const urlParams = new URLSearchParams(window.location.search);
      const demoId = urlParams.get("id");

      if (!demoId) {
        alert("未指定演示ID。");
        window.location.href = "index.html";
        return;
      }

      // Extract category from demoId (assuming format is "category-name" or "categorySomething")
      const category = this.getCategoryFromDemoId(demoId);

      // Load demos for the category
      await this.loadDemosForCategory(category);

      // Find the demo
      this.demo = this.demos.find((d) => d.id === demoId);
      if (!this.demo) {
        alert("未找到演示。");
        window.location.href = "index.html";
        return;
      }

      this.cacheDOM();
      this.renderMeta();
      this.loadDemo();
      this.bindEvents();
      this.setupCodePanelToggle(); // 初始化代码面板切换功能
    },

    getCategoryFromDemoId(demoId) {
      // Try to extract category from demoId
      // For example, "leaflet-basic" -> "leaflet"
      if (demoId.includes("-")) {
        return demoId.split("-")[0];
      }

      // Fallback - return leaflet as default
      return "leaflet";
    },

    async loadDemosForCategory(category) {
      try {
        // Clean up previous script if it exists
        const previousScript = document.querySelector(
          `script[data-category="${category.toLowerCase()}"]`
        );
        if (previousScript) {
          previousScript.remove();
        }

        // Remove any previously loaded demos data
        delete window[`${category.toLowerCase()}Demos`];

        // Dynamically load demo configuration for the selected category
        const script = document.createElement("script");
        script.src = `demos/${category.toLowerCase()}/demos.js`;
        script.type = "text/javascript";
        script.setAttribute("data-category", category.toLowerCase());

        // Create a promise that resolves when the script is loaded
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = () => {
            // If the script fails to load, initialize with an empty array
            window[`${category.toLowerCase()}Demos`] = [];
            resolve();
          };
          document.head.appendChild(script);
        });

        // Get the demos data
        this.demos = window[`${category.toLowerCase()}Demos`] || [];
      } catch (error) {
        console.error(`Error loading demos for category ${category}:`, error);
        this.demos = [];
      }
    },

    cacheDOM() {
      this.dom = {
        title: document.getElementById("demo-title"),
        backBtn: document.getElementById("back-btn"),
        previewFrame: document.getElementById("preview-frame"),
        codeEditor: document.getElementById("code-editor"),
        refreshBtn: document.getElementById("refresh-btn"),
        newTabBtn: document.getElementById("new-tab-btn"),
        downloadBtn: document.getElementById("download-btn"),
        deviceToggles: document.querySelectorAll(".device-toggle"),
        codePanel: document.getElementById("code-panel"),
        toggleCodePanelBtn: document.getElementById("toggle-code-panel"),
        expandIcon: document.getElementById("expand-icon"),
        collapseIcon: document.getElementById("collapse-icon"),
        previewPanel: document.getElementById("preview-panel"),
      };
    },

    renderMeta() {
      this.dom.title.textContent = this.demo.title;
      document.title = `${this.demo.title} - Demo 演示平台`;
    },

    async loadDemo() {
      const demoPath = this.demo.path;
      console.log("路径", demoPath);

      // Set iframe source
      this.dom.previewFrame.src = demoPath;
      this.dom.newTabBtn.href = demoPath;

      // Fetch code to display
      try {
        // We try to fetch the index.html of the demo to show in the code editor
        // Note: This requires the demo files to be accessible via fetch (same origin or CORS)
        const response = await fetch(demoPath);
        if (response.ok) {
          const text = await response.text();
          this.dom.codeEditor.textContent = text;
          // Trigger Prism highlight if available
          if (window.Prism) {
            window.Prism.highlightElement(this.dom.codeEditor);
          }
        } else {
          this.dom.codeEditor.textContent = "// 无法加载源代码。";
        }
      } catch (e) {
        console.error("加载源代码时出错:", e);
        this.dom.codeEditor.textContent =
          "// 加载源代码时出错。 \n// " + e.message;
      }
    },

    // 下载示例代码功能
    async downloadDemo() {
      try {
        // 显示加载状态
        const originalText = this.dom.downloadBtn.innerHTML;
        this.dom.downloadBtn.innerHTML =
          '<svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>';
        this.dom.downloadBtn.disabled = true;

        const zip = new JSZip();
        const demoId = this.demo.id;
        const demoPath = this.demo.path;
        // const demoFolder = zip.folder(demoId);

        // 获取HTML内容
        const response = await fetch(demoPath);
        if (!response.ok) {
          throw new Error("无法获取示例HTML文件");
        }
        let htmlContent = await response.text();

        // 创建资源映射
        const resourceMap = new Map();
        const resourcePromises = [];

        // 解析HTML中的资源链接
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlContent;
        const links = tempDiv.querySelectorAll(
          "link[href], script[src], img[src]"
        );

        links.forEach((element) => {
          let url = element.getAttribute("href") || element.getAttribute("src");
          if (!url) return;

          // 处理相对路径
          if (url.startsWith("./") || url.startsWith("../")) {
            const absoluteUrl = new URL(
              url,
              window.location.origin + "/" + demoPath + "/"
            ).href;
            // 保持原始路径结构
            const newPath = this.convertToZipPath(`/`, url);
            resourceMap.set(url, newPath);
            resourcePromises.push(
              this.fetchResource(absoluteUrl, zip, newPath)
            );
          } else if (url.startsWith("/")) {
            // 绝对路径，相对于网站根目录
            const newPath = url.substring(1); // 移除开头的'/'
            resourceMap.set(url, newPath);
            resourcePromises.push(
              this.fetchResource(window.location.origin + url, zip, newPath)
            );
          }
        });

        // 分析HTML内容，查找可能的资源文件引用
        const demoFilesBaseUrl =
          window.location.origin + "/" + this.demo.path + "/";

        // 查找HTML中所有以"./"开头的引用
        const relativeRefs = htmlContent.match(/\.\/[^"'>\s]+/g) || [];

        // 常见的资源文件扩展名
        const resourceExtensions = [
          ".png",
          ".jpg",
          ".jpeg",
          ".gif",
          ".bmp",
          ".svg",
          ".webp", // 图片文件
          ".json",
          ".geojson",
          ".topojson", // 数据文件
          ".txt",
          ".md", // 文本文件
          ".mp4",
          ".webm",
          ".ogg",
          ".mp3",
          ".wav", // 媒体文件
        ];

        // 处理找到的相对引用
        relativeRefs.forEach((ref) => {
          // 检查是否是我们关心的资源文件类型
          const hasValidExtension = resourceExtensions.some((ext) =>
            ref.endsWith(ext)
          );

          if (hasValidExtension) {
            // 提取文件名（去掉"./"前缀）
            const fileName = ref.substring(2);

            // 避免重复添加已在标准标签中处理过的资源
            if (!resourceMap.has(ref)) {
              const fileUrl = demoFilesBaseUrl + fileName;
              const zipPath = fileName;

              resourceMap.set(ref, zipPath);
              resourcePromises.push(this.fetchResource(fileUrl, zip, zipPath));
            }
          }
        });

        // 等待所有资源下载完成
        await Promise.all(resourcePromises);

        // 重写HTML中的资源路径
        resourceMap.forEach((newPath, originalPath) => {
          const escapedOriginalPath = originalPath.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
          );
          const regex = new RegExp(
            `(?<=[href|src]=["'])${escapedOriginalPath}(?=["'])`,
            "g"
          );
          htmlContent = htmlContent.replace(regex, newPath);
        });

        // 添加HTML文件到ZIP，放在demoId文件夹下
        const demoHtmlPath = "/index.html";
        zip.file(demoHtmlPath, htmlContent);

        // 生成ZIP文件并下载
        const blob = await zip.generateAsync({type: "blob"});
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = `${demoId}.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(downloadUrl);
      } catch (error) {
        console.error("下载出错:", error);
        alert("下载失败: " + error.message);
      } finally {
        // 恢复按钮状态
        this.dom.downloadBtn.innerHTML =
          '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>';
        this.dom.downloadBtn.disabled = false;
      }
    },

    // 将原始路径转换为ZIP中的路径
    convertToZipPath(demoPath, resourcePath) {
      // demoPath 示例: demos/leaflet/animation/radar-scan/index.html
      // resourcePath 示例: ../../libs/leaflet@1.9.4/dist/leaflet.css

      // 解析资源相对于demo文件的绝对路径
      const absoluteResourcePath = new URL(
        resourcePath,
        "http://example.com/" + demoPath
      ).pathname.substring(1);
      return absoluteResourcePath;
    },

    // 获取资源文件并添加到ZIP
    async fetchResource(url, zip, path) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const blob = await response.blob();
          // 确保路径中的目录存在
          const dirPath = path.substring(0, path.lastIndexOf("/"));
          if (dirPath) {
            zip.folder(dirPath);
          }
          zip.file(path, blob);
        }
      } catch (error) {
        console.warn(`无法获取资源: ${url}`, error);
      }
    },

    // 设置代码面板切换功能，初始化为隐藏状态
    setupCodePanelToggle() {
      this.hideCodePanel();
    },

    // 显示代码面板
    showCodePanel() {
      this.dom.codePanel.classList.remove("hidden");
      this.dom.codePanel.classList.add("flex");
      this.dom.expandIcon.classList.add("hidden");
      this.dom.collapseIcon.classList.remove("hidden");
      this.isCodePanelVisible = true;
    },

    // 隐藏代码面板
    hideCodePanel() {
      this.dom.codePanel.classList.add("hidden");
      this.dom.codePanel.classList.remove("flex");
      this.dom.expandIcon.classList.remove("hidden");
      this.dom.collapseIcon.classList.add("hidden");
      this.isCodePanelVisible = false;
    },

    // 切换代码面板显示状态
    toggleCodePanel() {
      if (this.isCodePanelVisible) {
        this.hideCodePanel();
      } else {
        this.showCodePanel();
      }
    },

    bindEvents() {
      this.dom.backBtn.addEventListener("click", () => {
        // window.location.href = 'index.html';
        // 从localStorage获取之前的分类信息（带时效性）
        const savedCategory = this.getItemWithExpiry("currentCategory");
        const savedSubcategory = this.getItemWithExpiry("currentSubcategory");

        let returnUrl = "index.html";
        if (savedCategory && savedSubcategory) {
          returnUrl += `?category=${encodeURIComponent(
            savedCategory
          )}&subcategory=${encodeURIComponent(savedSubcategory)}`;
        }

        window.location.href = returnUrl;
      });

      this.dom.refreshBtn.addEventListener("click", () => {
        // 清除 iframe 内容
        this.dom.previewFrame.src = "about:blank";
        // 短暂延迟后重新加载
        setTimeout(() => {
          this.dom.previewFrame.src = this.demo.path;
        }, 50);
      });

      this.dom.downloadBtn.addEventListener("click", () => {
        this.downloadDemo();
      });

      this.dom.deviceToggles.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          // Remove active class from all
          this.dom.deviceToggles.forEach((b) =>
            b.classList.remove("text-cyan-400", "bg-white/10")
          );
          // Add to clicked
          e.currentTarget.classList.add("text-cyan-400", "bg-white/10");

          const width = e.currentTarget.dataset.width;
          if (width === "100%") {
            this.dom.previewFrame.style.width = "100%";
          } else {
            this.dom.previewFrame.style.width = width;
          }
        });
      });

      // 添加代码面板切换事件
      this.dom.toggleCodePanelBtn.addEventListener("click", () => {
        this.toggleCodePanel();
      });
    },
  };

  viewer.init();
});
