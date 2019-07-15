import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-cube',
  template: ''
})
export class CubeComponent implements OnInit, OnChanges, OnDestroy {
  @Input() scene: THREE.Scene;
  @Input() x: number;
  @Input() y: number;
  @Input() z: number;
  @Input() color: number;
  @Input() id: string;
  @Input() visible: boolean;
  cube: THREE.Mesh;

  constructor() {}

  ngOnInit() {
    const geometry = new THREE.BoxGeometry(200, 200, 200);
    const material = new THREE.MeshBasicMaterial({
      color: this.color,
      wireframe: true
    });
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.x = this.x;
    this.cube.position.y = this.y;
    this.cube.position.z = this.z;
    this.cube.name = this.id;
    this.cube.visible = this.visible;
    this.scene.add(this.cube);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.visible) {
      this.cube.visible = this.visible;
    }
  }

  ngOnDestroy() {
    this.scene.remove(this.cube);
    this.cube.geometry.dispose();
    (this.cube.material as THREE.Material).dispose();
    this.cube = undefined;
  }
}
