import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1>ATLAS</h1>
    <p>Turn idle power into income</p>
    <button id="detect-btn">DETECT</button>
  </div>
`

// Simple click handler
document.getElementById('detect-btn').addEventListener('click', () => {
  const btn = document.getElementById('detect-btn')
  btn.textContent = 'DETECTING...'
  btn.disabled = true

  // Simulate detection (replace with real backend call later)
  setTimeout(() => {
    alert("Detected 42 GB available memory.\n\nReady to contribute?")
    btn.textContent = 'DETECT'
    btn.disabled = false
    // TODO: Redirect to dashboard or show results
  }, 1200)
})