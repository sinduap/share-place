export class Map {
  constructor(coords) {
    this.render(coords);
  }

  render(coordinates) {
    const map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([coordinates.lng, coordinates.lat]),
        maxZoom: 18,
        zoom: 12,
      }),
    });
    const layer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [
          new ol.Feature({
            geometry: new ol.geom.Point(
              ol.proj.fromLonLat([coordinates.lng, coordinates.lat])
            ),
          }),
        ],
      }),
    });
    map.addLayer(layer);
    const container = document.getElementById('popup');
    const content = document.getElementById('popup-content');
    document.querySelector('#map p').remove();

    const overlay = new ol.Overlay({
      element: container,
    });

    map.addOverlay(overlay);

    content.innerHTML = '<b>You are here</b>';
    overlay.setPosition(ol.proj.fromLonLat([coordinates.lng, coordinates.lat]));
  }
}
