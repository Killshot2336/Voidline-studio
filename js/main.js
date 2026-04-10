(function(){
  const cursor = document.getElementById("cursorGlow");
  window.addEventListener("mousemove", e => {
    if (!cursor) return;
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  const canvas = document.getElementById("bg");
  if (canvas && window.innerWidth > 700) {
    const ctx = canvas.getContext("2d");
    let w, h, points;
    function resize(){
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      points = Array.from({length: 60}, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35
      }));
    }
    function draw(){
      ctx.clearRect(0,0,w,h);
      for (const p of points) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      for (let i=0;i<points.length;i++){
        for (let j=i+1;j<points.length;j++){
          const a = points[i], b = points[j];
          const dx = a.x-b.x, dy = a.y-b.y;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < 140){
            ctx.strokeStyle = "rgba(255,90,31," + (0.10 - d/1800) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x,a.y);
            ctx.lineTo(b.x,b.y);
            ctx.stroke();
          }
        }
      }
      for (const p of points){
        ctx.fillStyle = "rgba(255,255,255,.55)";
        ctx.beginPath();
        ctx.arc(p.x,p.y,1.5,0,Math.PI*2);
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    resize(); draw();
    window.addEventListener("resize", resize);
  }

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(".reveal", {autoAlpha:0, y:24}, {autoAlpha:1, y:0, duration:.8, stagger:.08, ease:"power3.out"});
    gsap.utils.toArray(".reveal-item").forEach((el, i) => {
      gsap.fromTo(el, {autoAlpha:0, y:24}, {
        autoAlpha:1, y:0, duration:.8, delay:i*0.05, ease:"power3.out",
        scrollTrigger:{trigger:el, start:"top 85%", once:true}
      });
    });
  }

  document.querySelectorAll(".magnetic").forEach(button => {
    button.addEventListener("mousemove", e => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      button.style.transform = "translate(" + x * 0.12 + "px," + y * 0.12 + "px)";
    });
    button.addEventListener("mouseleave", () => {
      button.style.transform = "";
    });
  });

  document.querySelectorAll(".tilt").forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - py) * 6;
      const ry = (px - 0.5) * 8;
      card.style.transform = "perspective(900px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateY(-6px)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
})();
