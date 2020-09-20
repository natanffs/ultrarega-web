import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import { Container } from './styles';
import api from '../../services/api'

const Map = ({ lat, lng }) => {

    const test = `require([
        "esri/Map",
        "esri/views/SceneView",
        "esri/widgets/BasemapGallery",
        "esri/views/MapView",
        "esri/Graphic",
        "esri/geometry/Circle"
    ], function (Map, SceneView, BasemapGallery, MapView, Graphic, Circle) {
        var map = new Map({
            basemap: "hybrid"
        });

        var view = new SceneView({
            container: "viewDiv",
            map: map,
            center: [${lng}, ${lat}],
            zoom: 15
        });

        var point = {
            type: "point",
            longitude: ${lng},
            latitude: ${lat}
        }

        var markerSymbol = {
            type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
            style: "circle",
            color: [255,255,255,0],
            size: "220px",  // pixels
            outline: {  // autocasts as new SimpleLineSymbol()
                color: [255, 255, 255],
                width: 1  // points
            }
        };

        // Create a graphic and add the geometry and symbol to it
        var pointGraphic = new Graphic({
            geometry: point,
            symbol: markerSymbol
        });

        var polyline = {
            type: "polyline", // autocasts as new Polyline()
            paths: [
              [${lng}, ${lat}],
              [-46.860693,-17.292151],
            ]
          };

        var lineSymbol = {
            type: "simple-line", // autocasts as SimpleLineSymbol()
            color: [226, 119, 40],
            width: 2
          };

        var lineAtt = {
            Lâmina: "10mm",
            Sentido: "Horário"
          };

        var polylineGraphic = new Graphic({
            geometry: polyline,
            symbol: lineSymbol,
            attributes: lineAtt,
            popupTemplate: {
              // autocasts as new PopupTemplate()
              title: "{Name}",
              content: [
                {
                  type: "fields",
                  fieldInfos: [
                    {
                      fieldName: "Lâmina"
                    },
                    {
                      fieldName: "Sentido"
                    }
                  ]
                }
              ]
            }
          });

          var polyline2 = {
            type: "polyline", // autocasts as new Polyline()
            paths: [
              [${lng}, ${lat}],
              [-46.851707,-17.295317],
            ]
          };

        var lineSymbol2 = {
            type: "simple-line", // autocasts as SimpleLineSymbol()
            color: [106, 89, 231],
            width: 2
          };

          lineSymbol2.style = "short-dot";

        var polylineGraphic2 = new Graphic({
            geometry: polyline2,
            symbol: lineSymbol2,
          });


          var polyline3 = {
            type: "polyline", // autocasts as new Polyline()
            paths: [
              [${lng}, ${lat}],
              [-46.860134,-17.295994],
            ]
          };

        var lineSymbol3 = {
            type: "simple-line", // autocasts as SimpleLineSymbol()
            color: [213, 189, 14],
            width: 2
          };

        var polylineGraphic3 = new Graphic({
            geometry: polyline3,
            symbol: lineSymbol3,
          });


        view.graphics.addMany([polylineGraphic, polylineGraphic2, polylineGraphic3]);

        var basemapGallery = new BasemapGallery({
            view: view
        });
    });`

    useEffect(() => {
        const script = document.createElement("script")
        script.text = `${test}`

        document.head.appendChild(script)
    }, [])

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <div style={{ padding: 0, margin: 0, width: '100%', height: '70%' }} id="viewDiv"></div>
            {/* <div style={{ padding: 0, margin: 0, marginTop: '6vh', height: '70%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0, zIndex: 3 }}>
                <div style={{ padding: 0, margin: 0, height: 220, width: 220, backgroundColor: 'blue', borderRadius: '50%' }} />
            </div> */}
        </div>
    );
};

export default Map;
