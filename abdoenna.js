// script.js
document.addEventListener("DOMContentLoaded", function () {
    // Define Lume elements and data
    LUME.defineElements();

    const boxes = [
        ['teal', -300],
        ['pink', -200],
        ['skyblue', -100],
        ['orange', 0],
        ['deeppink', 100],
        ['cyan', 200],
        ['yellow', 300]
    ];

    // Create a Lume 3D Scene
    const scene = document.createElement("lume-scene");
    scene.setAttribute("webgl", "");

    // Define ambient and point lights
    const ambientLight = document.createElement("lume-ambient-light");
    ambientLight.setAttribute("intensity", "0.7");

    const pointLight = document.createElement("lume-point-light");
    pointLight.setAttribute("intensity", "0.5");
    pointLight.setAttribute("position", "300 -300 50");

    // Configure the camera
    const cameraRig = document.createElement("lume-camera-rig");

    // Use a template to create boxes based on data
    const template = document.createElement("template");
    template.setAttribute("x-data", "");
    template.setAttribute("x-for", "box in boxes");

    template.innerHTML = `
        <lume-box :position="box[1]" :color="box[0]" size="50 50 50" rotation="10 20 30" mount-point="0.5 0.5 0.5"></lume-box>
    `;

    // Append elements to the Lume 3D Scene
    scene.appendChild(ambientLight);
    scene.appendChild(pointLight);
    scene.appendChild(cameraRig);
    scene.appendChild(template);

    // Append the scene to the container
    const container = document.getElementById("lume-container");
    container.appendChild(scene);

    // Update box positions and rotations
    document.querySelectorAll('lume-box').forEach((box, i) => {
        box.position = (x, y, z, t) => [x, 100 * Math.sin(t * 0.001 + boxes[i][1]), z];
        box.rotation = (x, y, z, t) => [x, ++y, z];
    });
});
