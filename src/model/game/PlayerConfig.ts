export interface PlayerConfig {
  balloonLayers: number[];
  balloonGapSize: number;
  balloonLayerSize: number;
  rotateSpeed: number;
}

export const PLAYER_CONFIG: PlayerConfig = {
  balloonLayers: [4, 6, 8, 10],
  balloonGapSize: 3,
  balloonLayerSize: 10,
  rotateSpeed: 1,
};
