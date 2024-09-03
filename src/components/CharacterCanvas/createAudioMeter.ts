//@ts-nocheck

export function createAudioMeter(audioContext: AudioContext) {
  const processor = audioContext.createScriptProcessor(512)
  processor.onaudioprocess = (event) => {
    const buf = event.inputBuffer.getChannelData(0)
    const bufLength = buf.length
    let sum = 0
    let x

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < bufLength; i++) {
      x = buf[i]
      if (Math.abs(x) >= processor.clipLevel) {
        processor.clipping = true
        processor.lastClip = window.performance.now()
      }
      sum += x * x
    }
    const rms = Math.sqrt(sum / bufLength)
    processor.volume = Math.max(rms, processor.volume * processor.averaging)
  }
  processor.clipping = false
  processor.lastClip = 0
  processor.volume = 0
  processor.clipLevel = 0.98
  processor.averaging = 0.95
  processor.clipLag = 750

  processor.connect(audioContext.destination)

  processor.checkClipping = () => {
    if (!processor.clipping) {
      return false
    }
    if (processor.lastClip + processor.clipLag < window.performance.now()) {
      processor.clipping = false
    }
    return processor.clipping
  }

  processor.shutdown = () => {
    processor.disconnect()
    processor.onaudioprocess = null
  }

  return processor
}