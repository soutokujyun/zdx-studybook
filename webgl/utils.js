// css颜色转webgl颜色
function translateWebglColor(rgbColorStr = 'rgba(255, 0, 0, 1)') {
    const reg = RegExp(/\((.*)\)/);
    const rgbaStr = reg.exec(rgbColorStr)[1];
    const rgbaArr = rgbaStr.split(',').map(item => parseInt(item.trim()));
    const r = rgbaArr[0] / 255;
    const g = rgbaArr[1] / 255;
    const b = rgbaArr[2] / 255;
    const a = rgbaArr[3];
    return [r, g, b, a];
}

function initShaderProgram(gl, vsSource, fsSource) {
    // 创建着色器程序
    const shaderProgram = gl.createProgram();
    // 建立着色器对象
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    // 把顶点着色器和片元着色器关联到着色器程序
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    // 连接webgl上下文和着色器程序
    gl.linkProgram(shaderProgram);
    // 检查链接是否成功
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error('着色器程序链接失败:', gl.getProgramInfoLog(shaderProgram));
        return null;
    }
    // 启动着色器程序
    gl.useProgram(shaderProgram);
    // 将程序对象挂载到 WebGL 上下文
    gl.program = shaderProgram;
}

function loadShader(gl, type, source) {
    // 创建着色器对象
    const shader = gl.createShader(type);
    // 关联着色器源代码
    gl.shaderSource(shader, source);
    // 编译着色器
    gl.compileShader(shader);
    // 检查编译是否成功
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('着色器编译失败:', gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}

// 合成对象
class Compose {
    constructor() {
        this.parent = null;
        this.children = [];
    }

    add(child) {
        child.parent = this;
        this.children.push(child);
    }
    update(t) {
        this.children.forEach(child => {
            child.update(t);
        })
    }
}


export {
    Compose,
    translateWebglColor,
    initShaderProgram,
    loadShader
}