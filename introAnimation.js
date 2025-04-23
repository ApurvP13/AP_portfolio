export function introPageRender() {
  document.addEventListener("DOMContentLoaded", () => {
    // createWavingGridBackground();
    // Create a timeline for the sequence
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    // Set initial state - paths invisible
    gsap.set("#letter-a", {
      strokeDasharray: function (i, target) {
        return target.getTotalLength();
      },
      strokeDashoffset: function (i, target) {
        return target.getTotalLength();
      },
    });

    // Animate the drawing of each letter
    tl.to("#letter-a", {
      duration: 1.9,
      strokeDashoffset: 0,
    })

      // Pause to show the completed logo
      .to({}, { duration: 0.7 })

      // Add slight glow to the letters
      .to("#letter-a", {
        duration: 0.5,
        stroke: "#E6E6E6",
        filter: "drop-shadow(0 0 5px #694d43)",
      })

      // Zoom out effect
      .to("#ap-logo", {
        duration: 3,
        scale: 0.3,
        opacity: 0,
        filter: "blur(1px)",
        rotation: -5,
      })

      // Fade out the intro animation container
      .to("#intro-animation", {
        duration: 1,
        y: "-100%",
        ease: "power4.inOut",
      })

      // Fade in the main content
      .to(
        "#main-content",
        {
          opacity: 1,
          duration: 0.8,
          onComplete: function () {
            // Remove the intro animation from DOM after it's done
            document.getElementById("intro-animation").style.display = "none";
          },
        },
        "-=0.5"
      );
  });
}

// Create mesh background with GSAP
// function createWavingGridBackground() {
//   const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//   svg.setAttribute("width", "100%");
//   svg.setAttribute("height", "100%");
//   svg.style.position = "absolute";
//   svg.style.top = "0";
//   svg.style.left = "0";
//   svg.style.zIndex = "-1";

//   // Add a subtle gradient background
//   const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
//   const gradient = document.createElementNS(
//     "http://www.w3.org/2000/svg",
//     "linearGradient"
//   );
//   gradient.setAttribute("id", "bgGradient");
//   gradient.setAttribute("x1", "0%");
//   gradient.setAttribute("y1", "0%");
//   gradient.setAttribute("x2", "100%");
//   gradient.setAttribute("y2", "100%");

//   const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
//   stop1.setAttribute("offset", "0%");
//   stop1.setAttribute("stop-color", "#000");

//   const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
//   stop2.setAttribute("offset", "100%");
//   stop2.setAttribute("stop-color", "#111");

//   gradient.appendChild(stop1);
//   gradient.appendChild(stop2);
//   defs.appendChild(gradient);
//   svg.appendChild(defs);

//   // Background rect
//   const bgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
//   bgRect.setAttribute("width", "100%");
//   bgRect.setAttribute("height", "100%");
//   bgRect.setAttribute("fill", "url(#bgGradient)");
//   svg.appendChild(bgRect);

//   // Create horizontal grid lines
//   const lineSpacing = 30;
//   const horizontalLines = [];

//   for (let y = lineSpacing; y < window.innerHeight; y += lineSpacing) {
//     const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
//     line.setAttribute("stroke", "#ee6c4d");
//     line.setAttribute("stroke-width", "0.5");
//     line.setAttribute("fill", "none");
//     line.setAttribute("opacity", "0.3");

//     // Create initial straight line
//     line.setAttribute("d", `M0,${y} L${window.innerWidth},${y}`);

//     svg.appendChild(line);
//     horizontalLines.push(line);
//   }

//   // Create vertical grid lines
//   const verticalLines = [];

//   for (let x = lineSpacing; x < window.innerWidth; x += lineSpacing) {
//     const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
//     line.setAttribute("stroke", "#495057");
//     line.setAttribute("stroke-width", "0.5");
//     line.setAttribute("fill", "none");
//     line.setAttribute("opacity", "0.3");

//     // Create initial straight line
//     line.setAttribute("d", `M${x},0 L${x},${window.innerHeight}`);

//     svg.appendChild(line);
//     verticalLines.push(line);
//   }

//   document.getElementById("intro-animation").appendChild(svg);

//   // Animate horizontal lines with waves
//   horizontalLines.forEach((line, index) => {
//     animateHorizontalLine(line, index);
//   });

//   function animateHorizontalLine(line, index) {
//     const y = lineSpacing * (index + 1);
//     const amplitude = 5; // wave height
//     const frequency = 0.01; // wave frequency
//     const speed = 3 + (index % 3) * 0.2; // different speeds for variety

//     gsap.to(line, {
//       duration: 8 / speed,
//       ease: "linear",
//       onUpdate: function () {
//         const progress = this.progress();
//         let d = `M0,${y}`;

//         for (let x = 0; x < window.innerWidth; x += 10) {
//           const waveY =
//             y + Math.sin(x * frequency + progress * Math.PI * 2) * amplitude;
//           d += ` L${x},${waveY}`;
//         }

//         line.setAttribute("d", d);
//       },
//       repeat: -1,
//     });
//   }

//   // Add subtle movement to vertical lines
//   verticalLines.forEach((line, index) => {
//     const x = lineSpacing * (index + 1);

//     gsap.to(line, {
//       duration: 10 + (index % 5),
//       ease: "sine.inOut",
//       onUpdate: function () {
//         const progress = this.progress();
//         const waveFactor = Math.sin(progress * Math.PI * 2) * 3;

//         let d = `M${x},0`;

//         for (let y = 0; y < window.innerHeight; y += 10) {
//           const waveX = x + waveFactor;
//           d += ` L${waveX},${y}`;
//         }

//         line.setAttribute("d", d);
//       },
//       repeat: -1,
//     });
//   });
// }
