import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import * as uuid from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('rendererContainer') rendererContainer: ElementRef;

  renderer = new THREE.WebGLRenderer();
  scene = new THREE.Scene();
  camera: THREE.Camera;
  mesh: THREE.Mesh;
  items = [];

  constructor() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    this.camera.position.z = 1000;

    const geometry = new THREE.BoxGeometry(200, 200, 200);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true
    });
    this.mesh = new THREE.Mesh(geometry, material);

    this.scene.add(this.mesh);
  }

  ngAfterViewInit() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;
    this.renderer.render(this.scene, this.camera);
  }

  addRandomItem() {
    const colorString = this.getRandomColor();
    const colorNum = parseInt(colorString.replace('#', ''), 16);
    this.items.push({
      visible: true,
      colorString,
      colorNum,
      id: uuid.v4(),
      x: Math.floor(Math.random() * 200),
      y: Math.floor(Math.random() * 200),
      z: Math.floor(Math.random() * 200)
    });
  }

  removeItem(deleteItem) {
    this.items = this.items.filter(item => item.id !== deleteItem.id);
  }

  toggleItemVisibility(item) {
    item.visible = !item.visible;
  }

  getItemId(_: number, item) {
    return item.id;
  }

  private getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
