let slideIndex = 0;
    showSlide();

    function showSlide() {
      const slides = document.getElementsByClassName("gallery-item");
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }

      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }

      slides[slideIndex - 1].style.display = "block";
      setTimeout(showSlide, 60000); // Change slide every 3 seconds
    }

    function changeSlide(n) {
      slideIndex += n;
      const slides = document.getElementsByClassName("gallery-item");
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }
      if (slideIndex < 1) {
        slideIndex = slides.length;
      }

      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";
  }

