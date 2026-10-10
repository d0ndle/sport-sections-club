import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// 3D-модель мяча клуба (ДЗ, часть 2): файл models/club-ball.glb, загрузка через three.js
export class ClubBallModelComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML() {
        return (
            `
                <div class="card club-panel">
                    <div class="card-body">
                        <h5 class="club-card__title">Мяч клуба в 3D</h5>
                        <div id="club-ball-canvas" class="club-ball"></div>
                        <p class="text-muted small mb-0 mt-2">Вращайте мышью, колесо — приближение</p>
                    </div>
                </div>
            `
        )
    }

    // сцена — «мир», камера — откуда смотрим, renderer рисует сцену в <canvas>
    createScene(container) {
        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100)
        camera.position.set(0, 0.6, 3.2)

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setSize(container.clientWidth, container.clientHeight)
        renderer.setPixelRatio(window.devicePixelRatio)
        container.appendChild(renderer.domElement)

        // свет: мягкий общий и направленный, чтобы был объём
        scene.add(new THREE.HemisphereLight(0xffffff, 0x1e2758, 1.5))
        const sunLight = new THREE.DirectionalLight(0xffffff, 2)
        sunLight.position.set(3, 4, 5)
        scene.add(sunLight)

        // OrbitControls: вращение и зум мышью
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true

        return { scene, camera, renderer, controls }
    }

    render() {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML())
        const container = document.getElementById('club-ball-canvas')
        const { scene, camera, renderer, controls } = this.createScene(container)

        let clubBall = null
        new GLTFLoader().load('models/club-ball.glb', gltf => {
            clubBall = gltf.scene
            scene.add(clubBall)
        })

        const animate = () => {
            // ушли со страницы — canvas удалён из DOM, останавливаем анимацию
            if (!renderer.domElement.isConnected) {
                renderer.dispose()
                return
            }
            if (clubBall) {
                clubBall.rotation.y += 0.01
            }
            controls.update()
            renderer.render(scene, camera)
            requestAnimationFrame(animate)
        }
        animate()
    }
}
