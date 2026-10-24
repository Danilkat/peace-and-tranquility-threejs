import {
  BoxGeometry,
  EventDispatcher,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
} from "three";
import { WebGPURenderer } from "three/webgpu";

class Renderer extends EventDispatcher {
  renderer: WebGPURenderer = new WebGPURenderer();
  private rendererReady = false;

  private readonly scene = new Scene();
  private domElement: HTMLDivElement | null = null;
  public readonly camera: PerspectiveCamera = new PerspectiveCamera();

  constructor() {
    super();
    this.renderer
      .init()
      .then(() => (this.rendererReady = true))
      .catch((e) => {
        throw e;
      });

    const cubeGeom = new BoxGeometry();
    const cube = new Mesh(cubeGeom, new MeshBasicMaterial({ color: "black" }));

    this.scene.add(cube);

    this.camera.position.set(-2, 3, 3);
    this.camera.lookAt(cube.position);
    this.renderer.setAnimationLoop(() => {
      this.render();
    });
  }

  clearDomElement() {
    if (this.domElement) {
      this.renderer.domElement.remove();
      this.domElement = null;
    }
  }

  setDomElement(domElement: HTMLDivElement) {
    this.clearDomElement();
    domElement.append(this.renderer.domElement);
    this.domElement = domElement;
    this.setSize(domElement.clientWidth, domElement.clientHeight);
  }

  setSize(width: number, height: number) {
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  render() {
    if (!this.rendererReady) return;
    this.renderer.render(this.scene, this.camera);
  }
}

export { Renderer };
