// Генерация 3D-модели мяча клуба: node scripts/generate-club-ball.mjs
// Сфера + 12 «пятен» в вершинах икосаэдра (как у футбольного мяча) в цветах клуба,
// экспорт в models/club-ball.glb через GLTFExporter из three.js.
import { writeFileSync } from 'node:fs'
import * as THREE from 'three'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js'

// в Node нет FileReader, а GLTFExporter читает им Blob — делаем минимальную замену
globalThis.FileReader = class {
    readAsArrayBuffer(blob) {
        blob.arrayBuffer().then(buffer => {
            this.result = buffer
            this.onloadend?.()
        })
    }
}

const ballGeometry = new THREE.SphereGeometry(1, 240, 120)
ballGeometry.deleteAttribute('uv')

// 12 вершин икосаэдра — центры пятен
const goldenRatio = (1 + Math.sqrt(5)) / 2
const spotCenters = [
    [-1, goldenRatio, 0], [1, goldenRatio, 0], [-1, -goldenRatio, 0], [1, -goldenRatio, 0],
    [0, -1, goldenRatio], [0, 1, goldenRatio], [0, -1, -goldenRatio], [0, 1, -goldenRatio],
    [goldenRatio, 0, -1], [goldenRatio, 0, 1], [-goldenRatio, 0, -1], [-goldenRatio, 0, 1],
].map(([x, y, z]) => new THREE.Vector3(x, y, z).normalize())

const clubNavy = new THREE.Color('#0f1141')
const clubRed = new THREE.Color('#bf1c2d')
const ballWhite = new THREE.Color('#ffffff')
const spotRadius = 0.33 // угловой радиус пятна, рад

// красим каждую вершину: рядом с центром пятна — синий или красный, иначе белый
const positions = ballGeometry.attributes.position
const vertexColors = []
const vertex = new THREE.Vector3()
for (let index = 0; index < positions.count; index++) {
    vertex.fromBufferAttribute(positions, index).normalize()
    let nearestDot = -1
    let nearestSpot = 0
    spotCenters.forEach((spotCenter, spot) => {
        const dot = vertex.dot(spotCenter)
        if (dot > nearestDot) {
            nearestDot = dot
            nearestSpot = spot
        }
    })
    const isSpot = Math.acos(Math.min(1, nearestDot)) < spotRadius
    const color = isSpot ? (nearestSpot % 2 ? clubNavy : clubRed) : ballWhite
    vertexColors.push(color.r, color.g, color.b)
}
ballGeometry.setAttribute('color', new THREE.Float32BufferAttribute(vertexColors, 3))

const clubBall = new THREE.Mesh(ballGeometry, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.5 }))
clubBall.name = 'club-ball'

const scene = new THREE.Scene()
scene.add(clubBall)

new GLTFExporter().parse(
    scene,
    glb => writeFileSync('models/club-ball.glb', Buffer.from(glb)),
    error => console.error(error),
    { binary: true },
)
