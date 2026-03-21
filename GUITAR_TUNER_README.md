# Professional Guitar Tuner

A modern, full-featured online guitar tuner built with Next.js, Web Audio API, and real-time pitch detection. Supports multiple instruments, tuning modes, and accuracy levels.

## Features

### Core Features

- **Real-time Pitch Detection**: Autocorrelation-based pitch detection with ±1-2 cents accuracy
- **Animated Needle Gauge**: Smooth, responsive visual feedback with color coding (green/orange/red)
- **Microphone Access**: Simple, secure microphone permission handling
- **Signal Strength Indicator**: Visual feedback showing microphone input levels
- **Noise Filtering**: Automatically ignores background noise and focuses on dominant frequencies

### Tuning Modes

Supports 7 preset tuning styles for 6-string guitar:
- **Standard** (E-A-D-G-B-E) - Most common
- **Drop D** (D-A-D-G-B-E) - Heavy riffs
- **Half Step Down** (D♯-G♯-C♯-F♯-A♯-D♯) - Varied pitch
- **Full Step Down** (D-G-C-F-A-D) - Lower tuning
- **Open G** (D-G-D-G-B-D) - Open chords
- **Open D** (D-A-D-F♯-A-D) - Resonance
- **Open A** (E-A-E-A-C♯-E) - Brightness

### Multiple Instruments

- **6-String Guitar** (default)
- **7-String Guitar** (low B added)
- **12-String Guitar** (octave pairs)
- **Bass Guitar** (4-string, E1-A1-D2-G2)
- **Ukulele** (4-string, G-C-E-A)

### Smart Features

- **Auto String Detection**: Automatically identifies which string is being played
- **Reference Tone Player**: Play the correct pitch for any string to tune by ear
- **Accuracy Modes**:
  - **Beginner**: ±10 cents (relaxed tuning)
  - **Standard**: ±5 cents (balanced)
  - **Pro**: ±1-2 cents (precise professional tuning)
- **Keyboard Shortcuts**: Press 1-6 to quickly switch between strings

### Visual Design

- **Dark Mode Default**: Professional, musician-friendly dark interface
- **Glassmorphism UI**: Modern aesthetic with transparency and blur effects
- **Neon Accents**: Electric blue, cyan, purple, and green for vibrant feedback
- **Smooth Animations**: Responsive needle gauge and color transitions
- **Mobile-First**: Optimized for phones, tablets, and desktop

## Technical Stack

### Frontend
- **Next.js 16**: React framework with App Router
- **React 19**: Latest React features and hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling with custom animations
- **shadcn/ui**: High-quality UI components

### Audio Processing
- **Web Audio API**: Modern browser audio capabilities
- **Autocorrelation Algorithm**: Pitch detection based on YIN algorithm
- **Real-time Audio Capture**: MediaDevices.getUserMedia() for microphone access
- **OscillatorNode**: Sine wave generation for reference tones

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Main app page
│   └── globals.css             # Global styles, animations, theme variables
├── components/
│   ├── TunerContainer.tsx       # Main orchestration component
│   ├── TunerGauge.tsx          # Animated needle gauge (Canvas)
│   ├── NoteDisplay.tsx         # Note name, frequency, offset display
│   ├── StringSelector.tsx      # String selection buttons
│   ├── TuningModeSelector.tsx  # Tuning preset selector
│   ├── GuitarTypeSelector.tsx  # Instrument type selector
│   ├── ReferencePlayer.tsx     # Tone playback button
│   ├── MicrophoneStatus.tsx    # Permission & signal status
│   └── ui/
│       ├── button.tsx          # Button component
│       └── spinner.tsx         # Loading spinner
├── hooks/
│   ├── useAudioCapture.ts      # Microphone stream management
│   ├── usePitchDetector.ts     # Real-time pitch detection
│   └── useAudioTone.ts         # Audio tone generation
├── lib/
│   ├── tuningPresets.ts        # Tuning definitions & guitar types
│   ├── noteMap.ts              # Frequency ↔ note conversion, cents calculations
│   └── pitchDetection.ts       # Autocorrelation & signal processing algorithms
└── public/                     # Static assets
```

## How It Works

### 1. Audio Capture
- User grants microphone permission
- `useAudioCapture` hook creates AudioContext and AnalyserNode
- Real-time audio data is streamed at 48kHz sample rate

### 2. Pitch Detection
- Audio data is processed using autocorrelation algorithm
- Noise filtering removes background noise below threshold
- Detected frequency is smoothed using low-pass filter
- Confidence threshold filters out unreliable detections

### 3. Note Analysis
- Detected frequency is converted to musical note
- Cent offset calculated relative to target frequency (±50 cents scale)
- Color feedback determines in-tune status
- String is auto-detected from frequency matching

### 4. Visual Feedback
- **Gauge Needle**: Smooth animation to current frequency position
- **Color Feedback**: Green (in-tune), orange (close), red (out)
- **String Highlight**: Detected string shows green indicator
- **Signal Strength**: LED-style bars show microphone input level

## Browser Support

- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Safari 14+**: Full support (iOS 14.5+)
- **Mobile**: Works on iPhone, Android with microphone permission

Requirements:
- Web Audio API support
- MediaDevices.getUserMedia() (HTTPS or localhost)
- Modern JavaScript (ES2020+)

## Performance Optimization

- **Autocorrelation Algorithm**: Optimized for 40Hz-1000Hz (guitar frequency range)
- **Update Rate**: 50ms refresh for smooth UX without overload
- **Smoothing Filter**: 5-sample median filter for stable readings
- **RequestAnimationFrame**: 60fps gauge animations
- **Debounced Updates**: Audio data buffering to prevent excessive re-renders

## Accuracy & Precision

### Pitch Detection Accuracy
- **FFT Size**: 2048 samples at 48kHz = ~23ms window
- **Frequency Resolution**: ~23Hz bins
- **Autocorrelation**: Improves accuracy to ±1-2 cents for guitar notes
- **Smoothing**: Median filtering reduces jitter and false detections

### Cent Offset Accuracy
The app calculates cents (1/100th of a semitone):
- ±2 cents: Professional/studio standard
- ±5 cents: Standard tuning acceptable
- ±10 cents: Beginner/casual playing

### Note Frequency Reference
- A4 = 440 Hz (standard)
- Equal temperament tuning system
- Supports all 12 semitones

## Accessibility

- **ARIA Labels**: All interactive elements have proper labels
- **Keyboard Navigation**: 
  - Numbers 1-6 to select strings
  - Tab navigation for buttons
  - Enter/Space to activate buttons
- **Focus Indicators**: Clear visual focus states
- **Screen Reader Support**: Semantic HTML and ARIA roles
- **High Contrast**: Dark mode with vibrant neon accents

## Future Enhancements

- Custom tuning presets (save/load to localStorage)
- Chord recognition
- Frequency spectrum visualization
- Tuning history/trends
- Multiple language support
- Haptic feedback on mobile
- Polyphonic tuning (multiple strings at once)
- Tuning stability indicators

## Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd guitar-tuner

# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Building for Production

```bash
npm run build
npm start
```

## Usage Tips

1. **Best Environment**: Low background noise for accurate detection
2. **Microphone Placement**: Position 6-12 inches from instrument
3. **String Selection**: Manually select or let auto-detection find strings
4. **Accuracy Mode**: Use Beginner mode when learning, Pro for recording
5. **Reference Tones**: Use "Play Note" to train your ear
6. **Signal Strength**: Keep above 20% for stable readings

## Troubleshooting

### No Signal Detected
- Check microphone permissions in browser settings
- Move microphone closer to guitar
- Try a different tuning mode to test microphone
- Check system microphone is not muted

### Inaccurate Readings
- Reduce background noise
- Play louder/clearer notes
- Clean guitar strings (affects tone)
- Switch to Standard or Pro accuracy mode
- Try a different tuning mode

### Microphone Permission Denied
- Click the lock icon in URL bar and change permission to "Allow"
- Refresh the page after changing permissions
- Try in an incognito/private window

## License

MIT

## Credits

- Pitch detection algorithm based on YIN algorithm
- Built with Next.js, React, and modern Web APIs
- UI components from shadcn/ui
- Icons and design inspiration from contemporary music apps
