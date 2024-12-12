// 高级滚动动画
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-links a');

const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            updateActiveNavLink(id);
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

function updateActiveNavLink(id) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
        }
    });
}

// 高级Emoji跟随效果
const emojiFollower = document.querySelector('.emoji-follower');
const emojis = ['😊', '🎓', '📚', '💡', '💪', '✨', '🎯', '🎨', '🚀', '💻'];
let mouseX = 0;
let mouseY = 0;
let emojiX = 0;
let emojiY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animate() {
    // 添加平滑跟随效果
    const dx = mouseX - emojiX;
    const dy = mouseY - emojiY;
    
    emojiX += dx * 0.1;
    emojiY += dy * 0.1;
    
    emojiFollower.style.left = `${emojiX}px`;
    emojiFollower.style.top = `${emojiY}px`;
    
    requestAnimationFrame(animate);
}

animate();

// 随机切换emoji并添加旋转效果
setInterval(() => {
    emojiFollower.style.transform = 'scale(1.2) rotate(15deg)';
    setTimeout(() => {
        emojiFollower.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emojiFollower.style.transform = 'scale(1) rotate(0deg)';
    }, 150);
}, 2000);

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// 添加视差滚动效果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelector('.hero-content').style.transform = `translateY(${scrolled * 0.5}px)`;
});

// 数字增长动画
function animateNumbers() {
    const stats = document.querySelectorAll('.number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            stat.textContent = Math.round(current) + '+';
        }, 30);
    });
}

document.addEventListener('DOMContentLoaded', animateNumbers);

// 个人生活轮播图控制
class LifeCarousel {
    constructor() {
        this.currentIndex = 0;
        this.slides = document.querySelectorAll('.carousel-slide');
        this.thumbnails = document.querySelectorAll('.grid-item');
        this.prevButton = document.querySelector('.carousel-button.prev');
        this.nextButton = document.querySelector('.carousel-button.next');
        
        this.init();
    }

    init() {
        // 绑定按钮事件
        this.prevButton?.addEventListener('click', () => this.prev());
        this.nextButton?.addEventListener('click', () => this.next());

        // 绑定缩略图点击事件
        this.thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => this.goToSlide(index));
        });

        // 自动播放
        this.startAutoPlay();

        // 鼠标悬停时暂停自动播放
        document.querySelector('.life-carousel').addEventListener('mouseenter', () => this.stopAutoPlay());
        document.querySelector('.life-carousel').addEventListener('mouseleave', () => this.startAutoPlay());
    }

    goToSlide(index) {
        // 移除当前活动状态
        this.slides[this.currentIndex].classList.remove('active');
        this.thumbnails[this.currentIndex].classList.remove('active');

        // 更新索引
        this.currentIndex = index;
        if (this.currentIndex >= this.slides.length) this.currentIndex = 0;
        if (this.currentIndex < 0) this.currentIndex = this.slides.length - 1;

        // 添加新的活动状态
        this.slides[this.currentIndex].classList.add('active');
        this.thumbnails[this.currentIndex].classList.add('active');
    }

    next() {
        this.goToSlide(this.currentIndex + 1);
    }

    prev() {
        this.goToSlide(this.currentIndex - 1);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.next(), 5000);
    }

    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }
}

// 当DOM加载完成后初始化轮播图
document.addEventListener('DOMContentLoaded', () => {
    const carousel = new LifeCarousel();
});

// 研究经历滑块控制
class ResearchSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.research-slide');
        this.prevBtn = document.querySelector('.slider-prev');
        this.nextBtn = document.querySelector('.slider-next');
        this.dotsContainer = document.querySelector('.slider-dots');
        
        this.init();
    }

    init() {
        // 创建导航点
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });

        // 绑定按钮事件
        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());

        // 初始化第一张幻灯片
        this.updateSlides();
    }

    updateSlides() {
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === this.currentSlide) {
                slide.classList.add('active');
            }
        });

        // 更新导航点
        const dots = this.dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlides();
    }

    next() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlides();
    }

    prev() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.updateSlides();
    }
}

// 初始化滑块
document.addEventListener('DOMContentLoaded', () => {
    new ResearchSlider();
});

// 添加弹幕动画
function createDanmaku() {
    const container = document.querySelector('.danmaku-container');
    const messages = ['Be Patience and Persistance!', 'Life is in Passion!!'];
    
    setInterval(() => {
        messages.forEach((msg, index) => {
            const danmaku = document.createElement('div');
            danmaku.classList.add('danmaku-item');
            danmaku.textContent = msg;
            danmaku.style.top = `${20 + index * 40}%`;
            container.appendChild(danmaku);
            
            // 动画结束后删除元素
            danmaku.addEventListener('animationend', () => {
                danmaku.remove();
            });
        });
    }, 8000);
}

document.addEventListener('DOMContentLoaded', createDanmaku);

// 奖项图片轮播控制
class AwardsCarousel {
    constructor() {
        this.track = document.querySelector('.awards-track');
        this.slides = document.querySelectorAll('.awards-slide');
        this.prevBtn = document.querySelector('.awards-prev');
        this.nextBtn = document.querySelector('.awards-next');
        
        this.slideWidth = 100 / 5; // 每个slide占20%宽度
        this.currentIndex = 0;
        this.slidesCount = this.slides.length;
        this.isAnimating = false;
        
        this.init();
    }

    init() {
        // 复制前后各5个slide用于无缝循环
        const firstSlideClones = Array.from(this.slides).slice(0, 5)
            .map(slide => slide.cloneNode(true));
        const lastSlideClones = Array.from(this.slides).slice(-5)
            .map(slide => slide.cloneNode(true));

        firstSlideClones.forEach(clone => this.track.appendChild(clone));
        lastSlideClones.forEach(clone => this.track.insertBefore(clone, this.track.firstChild));

        // 设置初始位置
        this.currentIndex = 5;
        this.updatePosition();

        // 绑定事件
        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());

        // 自动播放
        this.startAutoPlay();
    }

    updatePosition() {
        const position = -(this.currentIndex * this.slideWidth);
        this.track.style.transform = `translateX(${position}%)`;
    }

    prev() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.currentIndex--;
        this.track.style.transition = 'transform 0.5s ease';
        this.updatePosition();

        if (this.currentIndex === 4) {
            setTimeout(() => {
                this.track.style.transition = 'none';
                this.currentIndex = this.slidesCount + 4;
                this.updatePosition();
                this.isAnimating = false;
            }, 500);
        } else {
            setTimeout(() => {
                this.isAnimating = false;
            }, 500);
        }
    }

    next() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.currentIndex++;
        this.track.style.transition = 'transform 0.5s ease';
        this.updatePosition();

        if (this.currentIndex === this.slidesCount + 5) {
            setTimeout(() => {
                this.track.style.transition = 'none';
                this.currentIndex = 5;
                this.updatePosition();
                this.isAnimating = false;
            }, 500);
        } else {
            setTimeout(() => {
                this.isAnimating = false;
            }, 500);
        }
    }

    startAutoPlay() {
        setInterval(() => {
            this.next();
        }, 3000);
    }
}

// 初始化奖项轮播
document.addEventListener('DOMContentLoaded', () => {
    new AwardsCarousel();
}); 