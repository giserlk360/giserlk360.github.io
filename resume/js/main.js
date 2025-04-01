/**
 * GIS工程师简历页面交互效果脚本
 */

document.addEventListener("DOMContentLoaded", () => {
  // 添加背景图片 - 创建一个模拟地图背景的元素
  if (!document.querySelector(".map-bg-effect")) {
    const mapEffect = document.createElement("div");
    mapEffect.className = "map-bg-effect";
    document.body.appendChild(mapEffect);

    // 添加网格线
    for (let i = 0; i < 20; i++) {
      const gridLine = document.createElement("div");
      gridLine.className = "grid-line";
      gridLine.style.top = `${5 * i}%`;
      mapEffect.appendChild(gridLine);

      const gridLineVert = document.createElement("div");
      gridLineVert.className = "grid-line vertical";
      gridLineVert.style.left = `${5 * i}%`;
      mapEffect.appendChild(gridLineVert);
    }
  }

  // 技能条动画效果
  setTimeout(() => {
    const skillBars = document.querySelectorAll(".skill-progress");
    skillBars.forEach((bar) => {
      const width = bar.style.width;
      bar.style.width = 0;
      setTimeout(() => {
        bar.style.width = width;
      }, 200);
    });
  }, 500);

  // 为技能项添加数据级别显示
  document.querySelectorAll(".skill-item span").forEach((span) => {
    const progressBar =
      span.nextElementSibling.querySelector(".skill-progress");
    const percentage = progressBar.style.width;
    span.setAttribute("data-level", percentage);
  });

  // 平滑滚动效果
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // 项目经验和工作经验项的悬停效果
  const items = document.querySelectorAll(".item");
  items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.transition = "all 0.3s ease";
    });
  });

  // 打印功能
  const printBtn = document.getElementById("print-btn");
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }

  // 添加顶部进度条
  const progressBar = document.createElement("div");
  progressBar.className = "progress-bar";
  document.body.appendChild(progressBar);

  // 监听滚动，更新进度条
  window.addEventListener("scroll", () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = progress + "%";
  });

  // 添加悬浮返回顶部按钮
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.className = "scroll-top-btn";
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(scrollTopBtn);

  // 显示/隐藏返回顶部按钮
  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 300) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  // 返回顶部功能
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // 为各部分添加进入视图动画
  const sectionsToAnimate = document.querySelectorAll("section");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sectionsToAnimate.forEach((section) => {
    section.classList.add("section-hidden");
    observer.observe(section);
  });

  // 添加GIS主题相关的装饰效果
  const addGisDecorations = () => {
    // 为项目经验部分添加坐标标记
    document.querySelectorAll(".projects .item").forEach((item, index) => {
      const coords = document.createElement("div");
      coords.className = "coords-marker";
      // 生成一些随机的"坐标"
      const lat = (Math.random() * 90).toFixed(4);
      const lng = (Math.random() * 180).toFixed(4);
      coords.innerHTML = `<span>${lat}°N, ${lng}°E</span>`;
      item.appendChild(coords);
    });
  };

  // 执行装饰效果
  addGisDecorations();

  // 项目图片展示控制
  function setupProjectImages() {
    const toggleButtons = document.querySelectorAll(".project-image-toggle");

    toggleButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const projectItem = this.closest(".item");
        const imageContainer = projectItem.querySelector(
          ".project-image-container"
        );

        if (imageContainer.classList.contains("active")) {
          // 关闭图片
          imageContainer.classList.remove("active");
          this.innerHTML = '<i class="fas fa-images"></i> 查看截图';
        } else {
          // 先关闭所有打开的图片
          document
            .querySelectorAll(".project-image-container.active")
            .forEach((container) => {
              container.classList.remove("active");
              container
                .closest(".item")
                .querySelector(".project-image-toggle").innerHTML =
                '<i class="fas fa-images"></i> 查看截图';
            });

          // 打开当前图片
          imageContainer.classList.add("active");
          this.innerHTML = '<i class="fas fa-times"></i> 关闭截图';

          // 滚动到图片位置
          setTimeout(() => {
            imageContainer.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }, 100);
        }
      });
    });

    // 为图片添加点击放大效果
    const projectImages = document.querySelectorAll(".project-image");
    projectImages.forEach((img) => {
      img.addEventListener("click", function () {
        if (this.classList.contains("enlarged")) {
          this.classList.remove("enlarged");
          this.style.transform = "";
          this.style.cursor = "zoom-in";
          this.style.zIndex = "";
        } else {
          this.classList.add("enlarged");
          this.style.transform = "scale(1.5)";
          this.style.cursor = "zoom-out";
          this.style.zIndex = "100";
        }
      });

      // 初始设置
      img.style.cursor = "zoom-in";
    });
  }

  // 为项目项添加悬停效果
  const projectItems = document.querySelectorAll(".projects .item");
  projectItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.classList.add("hover");
    });
    item.addEventListener("mouseleave", function () {
      this.classList.remove("hover");
    });
  });

  // 执行项目图片功能初始化
  setupProjectImages();
});
