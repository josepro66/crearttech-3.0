import { Product, ProductCategory } from './types';

export const THEME = {
  colors: {
    cyan: '#00f3ff',
    magenta: '#d946ef',
    purple: '#8b5cf6',
    dark: '#050505',
    glass: 'rgba(255, 255, 255, 0.05)',
  }
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Knobo',
    price: 165,
    category: ProductCategory.CONTROLLERS,
    description: 'Compacto, dinámico y listo para la acción. Control rotatorio de precisión.',
    specs: ['Rotary Encoder', 'Touch Sensitive', 'USB-C'],
    modelType: 'knob',
    modelPath: `${import.meta.env.BASE_URL}models/KNOBO.glb`,
    scale: 12,
    color: '#ff0055'
  },
  {
    id: '2',
    name: 'LOOPO',
    price: 165,
    category: ProductCategory.CONTROLLERS,
    description: 'Fluidez total, mezcla a tu manera. Perfecto para live looping.',
    specs: ['Loop Station', 'RGB Feedback', 'Portable'],
    modelType: 'pad',
    modelPath: `${import.meta.env.BASE_URL}models/LOOPO.glb`,
    scale: 11,
    color: '#00f3ff'
  },
  {
    id: '3',
    name: 'FADO',
    price: 203,
    category: ProductCategory.MIXERS,
    description: 'Control de faders suave y preciso para tu DAW.',
    specs: ['Motorized Faders', 'OLED Display', 'Metal Chassis'],
    modelType: 'fader',
    modelPath: `${import.meta.env.BASE_URL}models/FADO.glb`,
    scale: 11,
    color: '#ffffff'
  },
  {
    id: '4',
    name: 'Beato 8',
    price: 241,
    category: ProductCategory.CONTROLLERS,
    description: 'Controlador MIDI con 8 botones ARCADE y 4 knobs asignables para control preciso de mezclas, efectos y automatizaciones en tiempo real. Cuerpo metálico robusto y personalizable.',
    specs: ['8 Botones ARCADE', '4 Knobs Asignables', 'Cuerpo Metálico', 'Personalizable'],
    modelType: 'pad',
    modelPath: `${import.meta.env.BASE_URL}models/BEATO.glb`,
    scale: 11,
    color: '#d946ef'
  },
  {
    id: '5',
    name: 'Mixo',
    price: 292,
    category: ProductCategory.MIXERS,
    description: 'La solución completa de mezcla compacta.',
    specs: ['3-Band EQ', 'Crossfader', 'FX Controls'],
    modelType: 'knob',
    modelPath: `${import.meta.env.BASE_URL}models/MIXO.glb`,
    scale: 10,
    color: '#39ff14'
  },
  {
    id: '6',
    name: 'Beato 16',
    price: 355,
    category: ProductCategory.CONTROLLERS,
    description: 'Nuevo Beato, más control que nunca. 16 pads RGB.',
    specs: ['16 RGB Pads', 'Sequencer Mode', 'MIDI 2.0'],
    modelType: 'pad',
    modelPath: `${import.meta.env.BASE_URL}models/BEATO16.glb`,
    scale: 10,
    color: '#8b5cf6'
  }
];