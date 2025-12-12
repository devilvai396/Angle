
export function mountAngle(root, env) {
  function getAngle() {
    const now = new Date();
    const minutes = now.getHours()*60 + now.getMinutes();
    // map day (0..1440) to angle (-90..270)
    return (minutes/1440)*360 - 90;
  }

  root.innerHTML = `
    <div class="wrap">
      <header>
        <div class="logo">ANGLE</div>
        <div class="sub">${env.isMini ? "Mini App" : "Web"} · ${new Date().toDateString()}</div>
      </header>
      <canvas id="c" width="300" height="300"></canvas>
      <div class="caption">This line is the day.</div>
    </div>
  `;

  const c = root.querySelector("#c");
  const ctx = c.getContext("2d");

  function draw() {
    const w=c.width,h=c.height;
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle="rgba(2,6,23,1)";
    ctx.fillRect(0,0,w,h);

    const ang = getAngle()*Math.PI/180;
    const cx=w/2, cy=h/2;
    const len=w*0.4;

    ctx.strokeStyle="rgba(226,232,240,.9)";
    ctx.lineWidth=3;
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.lineTo(cx+Math.cos(ang)*len, cy+Math.sin(ang)*len);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx,cy,5,0,Math.PI*2);
    ctx.fillStyle="rgba(226,232,240,1)";
    ctx.fill();

    requestAnimationFrame(draw);
  }
  draw();
}
