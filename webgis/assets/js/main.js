/**
 * Main Dashboard Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  const app = {
    currentCategory: "Leaflet",
    currentSubcategory: "全部",
    demos: [],
    allDemos: [], // 存储所有分类的demo数据

    init() {
      this.cacheDOM();
      this.bindEvents();
      this.renderCategories();
      // this.loadDemosForCategory("Leaflet").then(() => {
      //   this.renderSidebar("Leaflet", "全部");
      //   this.renderGrid("Leaflet", "全部");
      // });

      // 从localStorage中获取分类状态（带时效性）
      const savedCategory = this.getItemWithExpiry("currentCategory");
      const savedSubcategory = this.getItemWithExpiry("currentSubcategory");

      if (savedCategory && savedSubcategory) {
        this.currentCategory = savedCategory;
        this.currentSubcategory = savedSubcategory;
        this.loadDemosForCategory(this.currentCategory).then(() => {
          this.updateCategoryNav(this.currentCategory);
          this.renderSidebar(this.currentCategory, this.currentSubcategory);
          this.renderGrid(this.currentCategory, this.currentSubcategory);
          this.checkScrollButtons(); // 初始化时检查是否需要显示滚动按钮
        });
      } else {
        this.loadDemosForCategory("Leaflet").then(() => {
          this.renderSidebar("Leaflet", "全部");
          this.renderGrid("Leaflet", "全部");
          this.checkScrollButtons(); // 初始化时检查是否需要显示滚动按钮
        });
      }

      // 预加载所有分类的demo数据用于全局搜索
      this.preloadAllDemos();
    },

    cacheDOM() {
      this.dom = {
        categoryNav: document.getElementById("category-nav"),
        sidebarMenu: document.getElementById("sidebar-menu"),
        demoGrid: document.getElementById("demo-grid"),
        searchInput: document.getElementById("search-input"),
        categoryTitle: document.getElementById("category-title"),
        navLeft: document.getElementById("nav-left"),
        navRight: document.getElementById("nav-right"),
      };
    },

    bindEvents() {
      this.dom.searchInput.addEventListener("input", (e) => {
        this.filterGrid(e.target.value);
      });

      // 绑定导航箭头事件
      if (this.dom.navLeft && this.dom.navRight && this.dom.categoryNav) {
        this.dom.navLeft.addEventListener("click", () => {
          this.dom.categoryNav.scrollBy({left: -200, behavior: "smooth"});
        });

        this.dom.navRight.addEventListener("click", () => {
          this.dom.categoryNav.scrollBy({left: 200, behavior: "smooth"});
        });

        // 监听滚动事件，控制箭头显示
        this.dom.categoryNav.addEventListener("scroll", () => {
          this.checkScrollButtons();
        });

        // 窗口大小改变时也要检查
        window.addEventListener("resize", () => {
          this.checkScrollButtons();
        });
      }
    },

    // 预加载所有分类的demo数据
    async preloadAllDemos() {
      const allDemos = [];
      for (const category of config.categories) {
        try {
          // 动态加载每个分类的demo配置
          await this.loadDemosForCategoryOnce(category);
          const categoryDemos = window[`${category.toLowerCase()}Demos`] || [];
          allDemos.push(...categoryDemos);
        } catch (error) {
          console.error(`Error loading demos for category ${category}:`, error);
        }
      }
      this.allDemos = allDemos;
    },

    // 仅加载一次指定分类的demo数据
    async loadDemosForCategoryOnce(category) {
      // 如果已经加载过该分类的数据，则直接返回
      if (window[`${category.toLowerCase()}Demos`]) {
        return Promise.resolve();
      }

      return this.loadDemosForCategory(category);
    },

    // 检查是否需要显示滚动按钮
    checkScrollButtons() {
      if (!this.dom.categoryNav || !this.dom.navLeft || !this.dom.navRight)
        return;

      const {scrollLeft, scrollWidth, clientWidth} = this.dom.categoryNav;
      const scrollPos = scrollLeft + clientWidth;

      // 根据滚动位置控制左右箭头的显示
      this.dom.navLeft.classList.toggle("opacity-0", scrollLeft <= 0);
      this.dom.navRight.classList.toggle("opacity-0", scrollPos >= scrollWidth);
    },

    renderCategories() {
      const nav = this.dom.categoryNav;
      nav.innerHTML = "";

      // Remove "All" button, start with first category as active
      config.categories.forEach((cat, index) => {
        const btn = this.createNavButton(cat, index === 0);
        nav.appendChild(btn);
      });

      // 渲染完后检查是否需要显示滚动按钮
      setTimeout(() => this.checkScrollButtons(), 0);
    },

    updateCategoryNav(activeCategory) {
      const nav = this.dom.categoryNav;
      nav.innerHTML = "";

      config.categories.forEach((cat) => {
        const isActive = cat === activeCategory;
        const btn = this.createNavButton(cat, isActive);
        nav.appendChild(btn);
      });

      // 更新后检查是否需要显示滚动按钮
      setTimeout(() => this.checkScrollButtons(), 0);
    },

    createNavButton(name, isActive = false) {
      const btn = document.createElement("button");
      btn.className = `px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
        isActive
          ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
          : "text-slate-400 hover:text-white hover:bg-white/5"
      }`;
      btn.textContent = name;
      btn.dataset.category = name;

      btn.addEventListener("click", () => {
        // Update active state
        Array.from(this.dom.categoryNav.children).forEach((c) => {
          c.className = c.className.replace(
            "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50",
            "text-slate-400 hover:text-white hover:bg-white/5"
          );
        });
        btn.className =
          "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 whitespace-nowrap";

        this.currentCategory = name;
        this.currentSubcategory = "全部";
        this.handleCategoryChange(name);

        // 滚动到选中的按钮位置
        setTimeout(() => {
          btn.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
          });
          this.checkScrollButtons();
          this.saveCategory();
        }, 100);
      });

      return btn;
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

    async handleCategoryChange(category) {
      // this.dom.categoryTitle.textContent = category;
      await this.loadDemosForCategory(category);
      this.renderSidebar(category, "全部");
      this.renderGrid(category, "全部");
    },

    renderSidebar(category, subcategory) {
      const menu = this.dom.sidebarMenu;
      menu.innerHTML = "";

      // Get subcategories for the selected category
      const subcategories = config.subcategories[category] || [];

      if (subcategories.length === 0) {
        menu.innerHTML =
          '<div class="p-4 text-slate-500 text-sm">该分类下暂无子菜单</div>';
        return;
      }

      // Add "All" subcategory
      const allSubBtn = document.createElement("div");
      allSubBtn.className = `p-3 rounded-lg cursor-pointer mb-1 ${
        subcategory === "全部"
          ? "bg-cyan-500/20 text-cyan-400"
          : "text-slate-400 hover:bg-white/5"
      }`;
      allSubBtn.textContent = "全部";
      allSubBtn.addEventListener("click", () => {
        this.currentSubcategory = "全部";
        this.renderSidebar(this.currentCategory, "全部");
        this.renderGrid(this.currentCategory, "全部");
        this.saveCategory();
      });
      menu.appendChild(allSubBtn);

      // Create menu items for each subcategory
      subcategories.forEach((sub) => {
        const subItem = document.createElement("div");
        subItem.className = `p-3 rounded-lg cursor-pointer mb-1 ${
          subcategory === sub
            ? "bg-cyan-500/20 text-cyan-400"
            : "text-slate-400 hover:bg-white/5"
        }`;
        subItem.textContent = sub;
        subItem.addEventListener("click", () => {
          this.currentSubcategory = sub;
          this.renderSidebar(this.currentCategory, sub);
          this.renderGrid(this.currentCategory, sub);
          this.saveCategory();
        });
        menu.appendChild(subItem);
      });
    },

    renderGrid(category, subcategory) {
      const grid = this.dom.demoGrid;
      grid.innerHTML = "";

      // 直接从全局变量获取最新的 demo 数据
      const currentDemos = window[`${category.toLowerCase()}Demos`] || [];
      let demos;
      if (subcategory === "全部") {
        demos = currentDemos;
      } else {
        demos = currentDemos.filter((d) => d.subcategory === subcategory);
      }

      if (demos.length === 0) {
        grid.innerHTML = `
                    <div class="col-span-full flex flex-col items-center justify-center py-20 text-slate-500">
                        <svg class="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                        <p>该分类下暂无演示。</p>
                        <p class="text-sm mt-2">请在 demos/${category.toLowerCase()}/demos.js 中添加！</p>
                    </div>
                `;
        return;
      }

      demos.forEach((demo, index) => {
        const card = document.createElement("div");
        card.id = `card-${demo.id}`;
        card.className =
          "glass-card rounded-xl overflow-hidden flex flex-col h-full cursor-pointer group animate-fade-in-up";
        card.style.animationDelay = `${index * 50}ms`;

        // Default thumbnail if none provided

        const thumb = `${demo.path}/thumbnail.png`;

        card.innerHTML = `
                    <div class="relative h-48 overflow-hidden">
                        <div class="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                        <img src="${thumb}" alt="${
          demo.title
        }" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" onerror="this.src='assets/imgs/thumbnail-default.png'; this.onerror=null;">
                        <div class="absolute top-3 right-3 z-20">
                            <span class="px-2 py-1 text-xs font-bold bg-black/50 backdrop-blur text-white rounded border border-white/10">${
                              demo.category
                            }</span>
                        </div>
                    </div>
                    <div class="p-5 flex-1 flex flex-col">
                        <h3 class="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">${
                          demo.title
                        }</h3>
                        <p class="text-slate-400 text-sm mb-4 flex-1 line-clamp-2" title="${
                          demo.description
                        }">${demo.description}</p>
                        <div class="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                            <div class="flex gap-2">
                                ${(demo.tags || [])
                                  .map(
                                    (tag) =>
                                      `<span class="text-xs text-slate-500">#${tag}</span>`
                                  )
                                  .join("")}
                            </div>
                            <span class="text-cyan-400 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 transition-transform">
                                查看演示 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </span>
                        </div>
                    </div>
                `;

        card.addEventListener("click", () => {
          // 保存当前分类和子分类状态到localStorage
          this.saveCategory();
          window.location.href = `viewer.html?id=${demo.id}`;
        });

        grid.appendChild(card);
      });
    },

    filterGrid(query) {
      if (!query) {
        // 如果没有搜索关键词，恢复到当前分类的显示
        this.renderGrid(this.currentCategory, this.currentSubcategory);
        return;
      }

      // 在所有demo中搜索
      const lowerQuery = query.toLowerCase();
      const matchedDemos = this.allDemos.filter((demo) => {
        const title = demo.title.toLowerCase();
        const desc = demo.description.toLowerCase();
        const tags = (demo.tags || []).join(" ").toLowerCase();
        const category = demo.category.toLowerCase();
        const subcategory = demo.subcategory.toLowerCase();

        return (
          title.includes(lowerQuery) ||
          desc.includes(lowerQuery) ||
          tags.includes(lowerQuery) ||
          category.includes(lowerQuery) ||
          subcategory.includes(lowerQuery)
        );
      });

      // 显示搜索结果
      this.showSearchResults(matchedDemos);
    },

    showSearchResults(demos) {
      const grid = this.dom.demoGrid;
      grid.innerHTML = "";

      if (demos.length === 0) {
        grid.innerHTML = `
          <div class="col-span-full flex flex-col items-center justify-center py-20 text-slate-500">
            <svg class="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <p>未找到匹配的演示。</p>
            <p class="text-sm mt-2">请尝试其他关键词。</p>
          </div>
        `;
        return;
      }

      // 按分类分组显示搜索结果
      const groupedDemos = {};
      demos.forEach((demo) => {
        if (!groupedDemos[demo.category]) {
          groupedDemos[demo.category] = [];
        }
        groupedDemos[demo.category].push(demo);
      });

      // 显示搜索结果
      Object.keys(groupedDemos).forEach((category) => {
        const categoryHeader = document.createElement("div");
        categoryHeader.className =
          "col-span-full pb-4 border-b border-white/10 mb-6";
        categoryHeader.innerHTML = `<h2 class="text-xl font-bold text-white">${category}</h2>`;
        grid.appendChild(categoryHeader);

        groupedDemos[category].forEach((demo, index) => {
          const card = document.createElement("div");
          card.id = `card-${demo.id}`;
          card.className =
            "glass-card rounded-xl overflow-hidden flex flex-col h-full cursor-pointer group animate-fade-in-up";
          card.style.animationDelay = `${index * 50}ms`;

          const thumb = `${demo.path}/thumbnail.png`;

          card.innerHTML = `
            <div class="relative h-48 overflow-hidden">
              <div class="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10"></div>
              <img src="${thumb}" alt="${demo.title}"
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                onerror="this.src='assets/imgs/thumbnail-default.png'; this.onerror=null;">
              <div class="absolute top-3 right-3 z-20">
                <span class="px-2 py-1 text-xs font-bold bg-black/50 backdrop-blur text-white rounded border border-white/10">
                  ${demo.category}
                </span>
              </div>
            </div>
            <div class="p-5 flex-1 flex flex-col">
              <h3 class="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                ${demo.title}
              </h3>
              <p class="text-slate-400 text-sm mb-4 flex-1 line-clamp-2" title="${
                demo.description
              }">
                ${demo.description}
              </p>
              <div class="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <div class="flex gap-2">
                  ${(demo.tags || [])
                    .map(
                      (tag) =>
                        `<span class="text-xs text-slate-500">#${tag}</span>`
                    )
                    .join("")}
                </div>
                <span class="text-cyan-400 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 transition-transform">
                  查看演示 
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </span>
              </div>
            </div>
          `;

          card.addEventListener("click", () => {
            // 定位到demo位置 - 切换到对应的分类
            this.switchToDemoCategory(demo);
          });

          grid.appendChild(card);
        });
      });

      // 搜索完成后滚动到顶部
      setTimeout(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
      }, 100);
    },

    // 切换到指定demo所在的分类
    async switchToDemoCategory(demo) {
      // 更新当前分类
      this.currentCategory = demo.category;
      this.currentSubcategory = demo.subcategory;

      // 更新导航栏激活状态
      this.updateCategoryNav(this.currentCategory);

      // 加载并渲染对应分类的内容
      await this.loadDemosForCategory(this.currentCategory);
      this.renderSidebar(this.currentCategory, this.currentSubcategory);
      this.renderGrid(this.currentCategory, this.currentSubcategory);

      // 保存分类状态
      this.saveCategory();

      // 滚动到对应的demo卡片
      setTimeout(() => {
        const targetCard = document.getElementById(`card-${demo.id}`);
        if (targetCard) {
          targetCard.scrollIntoView({behavior: "smooth", block: "center"});
          // 添加高亮效果
          targetCard.classList.add("ring-2", "ring-cyan-400");
          setTimeout(() => {
            targetCard.classList.remove("ring-2", "ring-cyan-400");
          }, 2000);
        }
      }, 300);
    },

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

    saveCategory() {
      this.setItemWithExpiry("currentCategory", this.currentCategory, 60); // 60分钟过期
      this.setItemWithExpiry("currentSubcategory", this.currentSubcategory, 60); // 60分钟过期
    },
  };

  app.init();
});
