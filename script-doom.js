var root = {
  wavecolor: {
    r: 125,
    g: 52,
    b: 253,
  },
  rainbowSpeed: 0.5,
  rainbow: true,
  matrixspeed: 50,
}

var c = document.getElementById("c")
var ctx = c.getContext("2d")

var hueFw = false
var hue = -0.01

c.height = window.innerHeight
c.width = window.innerWidth

var font_size = 14

window.onresize = () => {
  location.reload()
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}
function drawFire() {
  var width = c.width
  var height = c.height
  var firePixels = []
  var fireWidth = Math.floor(width / font_size)
  var fireHeight = Math.floor(height / font_size)
  var fireColorsPalette = [
    [7, 7, 7],
    [31, 7, 7],
    [47, 15, 7],
    [71, 15, 7],
    [87, 23, 7],
    [103, 31, 7],
    [119, 31, 7],
    [143, 39, 7],
    [159, 47, 7],
    [175, 63, 7],
    [191, 71, 7],
    [199, 71, 7],
    [223, 79, 7],
    [223, 87, 7],
    [223, 87, 7],
    [215, 95, 7],
    [215, 95, 7],
    [215, 103, 15],
    [207, 111, 15],
    [207, 119, 15],
    [207, 127, 15],
    [207, 135, 23],
    [199, 135, 23],
    [199, 143, 23],
    [199, 151, 31],
    [191, 159, 31],
    [191, 159, 31],
    [191, 167, 39],
    [191, 167, 39],
    [191, 175, 47],
    [183, 175, 47],
    [183, 183, 47],
    [183, 183, 55],
    [207, 207, 111],
    [223, 223, 159],
    [239, 239, 199],
    [255, 255, 255],
  ]

  for (var i = 0; i < fireWidth * fireHeight; i++) {
    firePixels[i] = 0
  }

  function createFireSource() {
    for (var column = 0; column <= fireWidth; column++) {
      var overflowPixelIndex = fireWidth * fireHeight
      var pixelIndex = overflowPixelIndex - fireWidth + column
      firePixels[pixelIndex] = 36
    }
  }

  function calculateFirePropagation() {
    for (var column = 0; column < fireWidth; column++) {
      for (var row = 0; row < fireHeight; row++) {
        var pixelIndex = column + fireWidth * row
        updateFireIntensityPerPixel(pixelIndex)
      }
    }
  }

  function updateFireIntensityPerPixel(currentPixelIndex) {
    var belowPixelIndex = currentPixelIndex + fireWidth
    if (belowPixelIndex >= fireWidth * fireHeight) {
      return
    }
    var decay = Math.floor(Math.random() * 3)
    var belowPixelFireIntensity = firePixels[belowPixelIndex]
    var newFireIntensity =
      belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0
    firePixels[currentPixelIndex - decay] = newFireIntensity
  }

  function renderFire() {
    for (var row = 0; row < fireHeight; row++) {
      for (var column = 0; column < fireWidth; column++) {
        var pixelIndex = column + fireWidth * row
        var fireIntensity = firePixels[pixelIndex]
        var color = fireColorsPalette[fireIntensity]
        var colorString = color
          ? `rgb(${color[0]},${color[1]},${color[2]})`
          : "rgb(0,0,0)"
        ctx.fillStyle = colorString
        ctx.fillRect(column * font_size, row * font_size, font_size, font_size)
      }
    }
  }

  createFireSource()
  setInterval(function () {
    calculateFirePropagation()
    renderFire()
  }, root.matrixspeed)
}

drawFire()
