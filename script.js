if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

document.addEventListener("DOMContentLoaded", () => {
  const hamMenu = document.querySelector(".ham-menu");
  const offScreenMenu = document.querySelector(".off-screen-menu");
  const discussBtn = document.querySelector(".discussbtn");

  const toggleMenu = () => {
    hamMenu.classList.toggle("active");
    offScreenMenu.classList.toggle("active");
    if (discussBtn) {
      discussBtn.classList.toggle("active");
    }
  };
  hamMenu.addEventListener("click", toggleMenu);
  document.addEventListener("click", (event) => {
    if (!hamMenu.contains(event.target) && !offScreenMenu.contains(event.target) && offScreenMenu.classList.contains("active")) {
      toggleMenu();
    }
  });

  document.addEventListener("scroll", () => {
    if (offScreenMenu.classList.contains("active")) {
      toggleMenu();
    }
  });

  const slog = document.querySelector('.slog');
  const hinx = document.querySelector('.hinx');
  const nex = document.querySelector('.nex');
  setTimeout(() => {
    hinx.classList.add('fade-in');
    nex.classList.add('fade-in');
    slog.classList.add('fade-in');
  }, 100);
  
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const maxScroll = 300;
    const opacity = 1 - Math.min(scrollPosition / maxScroll, 1);
    hinx.style.opacity = opacity;
    nex.style.opacity = opacity;
    slog.style.opacity = opacity;
  });

  const carouselInner = document.querySelector('.carousel-inner');
  const carouselItems = document.querySelectorAll('.carousel-item');
  let currentIndex = 0;
  const totalItems = carouselItems.length;

  function moveCarousel() {
    currentIndex = (currentIndex + 1) % totalItems;
    const offset = -currentIndex * 100;
    carouselInner.style.transform = `translateX(${offset}%)`;
  }

  setInterval(moveCarousel, 2500);
  
  const textElement = document.getElementById('tex');
  const typingText = `We are HinX more than just a digital agency, partners in your success. Specializing in a wide range of tailored solutions and services, we provide everything you need to start, grow, and sustain your business. Our goal is to deliver quality services at affordable prices.
 In today’s world, a strong digital presence isn’t just an option—it’s a necessity. We’re here to help you make that vital step into the Digital World.`;

  let startTyping = false;
  const typingDelay = 780;

  function typeText(element, text, delay = 0) {
    let index = 0;
    element.innerHTML = "";

    function type() {
      if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
        setTimeout(type, 17);
      }
    }

    setTimeout(type, delay);
  }

  function isInView(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  }

  function handleScroll() {
    const section = document.querySelector('.tex-2');
    if (isInView(section) && !startTyping) {
      startTyping = true;
      typeText(textElement, typingText, typingDelay);
      window.removeEventListener('scroll', handleScroll);
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();
 
  const tex1 = document.querySelector('.tex-1');

  function checkVisibility() {
    const rect = tex1.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (isVisible) {
      tex1.classList.add('visible');
    }
  }

  window.addEventListener('scroll', checkVisibility);
  checkVisibility(); 
});

document.addEventListener('DOMContentLoaded', function() {
  const carousels = document.querySelectorAll('.carousel');

  const observerOptions = {
      root: null, 
      rootMargin: '0px',
      threshold: 0.1 
  };

  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target); 
          }
      });
  }, observerOptions);

  carousels.forEach(carousel => {
      observer.observe(carousel);
  });
});

document.addEventListener('DOMContentLoaded', () => {
 
  function typeWriter(element, text, speed) {
      let i = 0;
      element.textContent = ''; 
      const interval = setInterval(() => {
          if (i < text.length) {
              element.textContent += text.charAt(i);
              i++;
          } else {
              clearInterval(interval);
          }
      }, speed);
  }

  const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              
              const element = entry.target.querySelector('.tex-1');
              if (element) {
                  typeWriter(element, element.textContent, 90);
              }

              
              entry.target.classList.add('visible');
              observer.unobserve(entry.target); 
          }
      });
  }, options);

  document.querySelectorAll('.intro-sec').forEach(section => {
      observer.observe(section);
  });

  const carousels = document.querySelectorAll('.carousel'); 
  carousels.forEach(carousel => {
      observer.observe(carousel);
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const boxes = document.querySelectorAll('.box');

  const revealBoxes = () => {
      gsap.fromTo(boxes,
          { 
              opacity: 0,
              scale: 0,
              filter: "blur(20px)"
          }, 
          {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.9,
              ease: "power4.inOut",
              keyframes: [
                  { filter: "blur(20px)", duration: 0.30 },
                  { filter: "blur(15px)", duration: 0.25 },
                  { filter: "blur(10px)", duration: 0.15 },
                  { filter: "blur(5px)", duration: 0.20 },
                  { filter: "blur(0px)", duration: 0.10 }
              ],
          }
      );
  };

  const servicesSection = document.querySelector('.services');
  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              revealBoxes();
              observer.disconnect(); 
          }
      });
  });

  observer.observe(servicesSection);
});

document.addEventListener('DOMContentLoaded', function() {
  const sliderList = document.querySelector('.slider-list');
  const prevButton = document.querySelector('.slider-button.prev');
  const nextButton = document.querySelector('.slider-button.next');
  
  let scrollAmount = 0;
  const itemsToShow = 3; 
  const itemWidth = sliderList.querySelector('.slider-item').offsetWidth;
  const totalItems = sliderList.children.length;
  
  function updateSlider() {
      const offset = -scrollAmount;
      sliderList.style.transform = `translateX(${offset}px)`;
  }
  
  function autoScroll() {
      if (scrollAmount < (totalItems - itemsToShow) * itemWidth) {
          scrollAmount += itemWidth;
      } else {
          scrollAmount = 0;
      }
      updateSlider();
  }
  
  setInterval(autoScroll, 8000);
  
  prevButton.addEventListener('click', function() {
      if (scrollAmount > 0) {
          scrollAmount -= itemWidth;
      } else {
          scrollAmount = (totalItems - itemsToShow) * itemWidth;
      }
      updateSlider();
  });
  
  nextButton.addEventListener('click', function() {
      if (scrollAmount < (totalItems - itemsToShow) * itemWidth) {
          scrollAmount += itemWidth;
      } else {
          scrollAmount = 0;
      }
      updateSlider();
  });
});

 document.addEventListener('DOMContentLoaded', () => {
    const whatsappIcon = document.querySelector('.whatsapp-icon');

    let hasScrolled = false;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 200 && !hasScrolled) { 
        whatsappIcon.classList.add('visible');
        hasScrolled = true;
      }
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('vid');

    const playVideoAndStartAnimations = () => {
        video.play().then(() => {
          
            startAnimations();
        })
    };

    const startAnimations = () => {
        
    };

    playVideoAndStartAnimations();
});
  document.addEventListener('DOMContentLoaded', function () {
    const whatsappIcon = document.querySelector('.whatsapp-icon');
    const chatBox = document.querySelector('.wa-chat-box');
    const closeBtn = document.querySelector('.wa-chat-bubble-close-btn');

    whatsappIcon.addEventListener('click', function () {
      if (chatBox.style.display === 'none' || chatBox.style.display === '') {
        chatBox.style.display = 'block';
      } else {
        chatBox.style.display = 'none';
      }
    });

    closeBtn.addEventListener('click', function () {
      chatBox.style.display = 'none';
    });
  });
  document.addEventListener('DOMContentLoaded', () => {
    const whatsappIcon = document.querySelector('.whatsapp-icon');

    let hasScrolled = false;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 100 && !hasScrolled) { 
        whatsappIcon.classList.add('visible');
        hasScrolled = true;
      }
    });
  });

  document.addEventListener("DOMContentLoaded", function() {
    const sliderItems = document.querySelectorAll('.slider-item');
  
    const animateSliderItems = () => {
      gsap.to(sliderItems, {
        opacity: 1, 
        y: 0, 
        duration: 0.5,
        ease: "power1.inout",
      });
    };
  
    const projectSection = document.querySelector('.project');
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSliderItems();
          observer.disconnect(); 
        }
      });
    }, { threshold: 0.1 }); 
  
    observer.observe(projectSection);
  });
  
  
  function animateOnScroll() {
    const section = document.querySelector('.hir-act');
    
    gsap.fromTo(section, 
        { 
            x: '-100%', 
            opacity: 0 
        }, 
        { 
            x: '0%', 
            opacity: 1, 
            duration: 1.5, 
            ease: 'power2.inOut',
            onStart: () => {
                section.classList.add('glow-text');
            },
            onUpdate: () => {
                
                if (gsap.getProperty(section, "x") === '0%') {
                    section.classList.add('glow-splash');
                }
            },
            onComplete: () => {
        
                section.classList.remove('glow-splash');
                section.classList.remove('glow-text');
            }
        }
    );
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScroll() {
    const section = document.querySelector('.hir-sec');
    if (isInViewport(section)) {
        animateOnScroll();
        window.removeEventListener('scroll', handleScroll); 
    }
}
window.addEventListener('scroll', handleScroll);
document.addEventListener('DOMContentLoaded', handleScroll);

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const fullName = document.getElementById('full-name').value;
  const email = document.getElementById('contact-email').value;
  const phone = document.getElementById('phone').value;
  const company = document.getElementById('company').value;
  const message = document.getElementById('message').value;
  const responseMessage = document.createElement('p');
  const formContainer = document.querySelector('.contact-wrapper');
  formContainer.appendChild(responseMessage);

  if (validateFullName(fullName) && validateContactEmail(email) && validatePhone(phone) && validateMessage(message)) {
    
    const formData = { fullName, email, phone, company, message };

    fetch('https://hinx.vercel.app/api/send-email', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();  // Changed to .json() to match API response
    })
    .then(data => {
      console.log('Server response:', data);  
      responseMessage.textContent = data.message;  // Updated to match API response
      responseMessage.style.color = '#28a745';
      document.getElementById('contact-form').reset();
    })
    .catch(error => {
      console.error('Error during fetch:', error);  
      responseMessage.textContent = 'Error: Unable to send the message.';
      responseMessage.style.color = '#d9534f';
    });

    setTimeout(() => {
      formContainer.removeChild(responseMessage);
    }, 3000);  
  } else {
    responseMessage.textContent = 'Please fill out all required fields correctly.';
    responseMessage.style.color = '#d9534f';
  }
});

function validateFullName(name) {
  return name.trim() !== '';
}

function validateContactEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^[\d\s\+\-()]+$/;
  return re.test(phone);
}

function validateMessage(message) {
  return message.trim() !== '';
}

document.getElementById('newsletter-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('newsletter-email').value;
  const responseMessage = document.createElement('p');

  const formContainer = document.querySelector('.newsletter-wrapper');
  formContainer.appendChild(responseMessage);

  if (validateNewsletterEmail(email)) {
    responseMessage.textContent = 'Thank you for subscribing!';
    responseMessage.style.color = '#28a745';

  
    document.getElementById('newsletter-form').reset();
  } else {
    responseMessage.textContent = 'Please enter a valid email address.';
    responseMessage.style.color = '#d9534f';
  }

  setTimeout(function() {
    formContainer.removeChild(responseMessage); 
  }, 1000);
});

function validateNewsletterEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}






















































