export interface PlayerConfig {
  balloonLayers: number[];
  balloonGapSize: number;
  balloonLayerSize: number;
  shadowBlur: number;
  centerRadius: number;
  centerThickness: number;
  rotateSpeed: number;
  paddleRadianLength: number;
  paddleThickness: number;
}

export const PLAYER_CONFIG: PlayerConfig = {
  balloonLayers: [6, 8, 10, 12],
  balloonGapSize: 3,
  balloonLayerSize: 8,
  shadowBlur: 15,
  centerRadius: 40,
  centerThickness: 5,
  rotateSpeed: 3,
  paddleRadianLength: Math.PI / 3,
  paddleThickness: 5,
};
