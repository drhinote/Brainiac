import { CordovaService } from './cordova.service';
import {Observable} from 'rxjs';

function addSample(sample, finger) {
        if (finger.samples) finger.samples.push(sample);
    }
  
    function toPercent(total, count, finger) {
        return ((total / count - finger.offset) / (finger.max - finger.offset) * 100).toFixed(1);
    }

    function populateFinger(finger, data, idx) {
        finger.offset = data[idx] * 65536 + data[idx + 1] * 256 + data[idx + 2];
        finger.max = data[idx + 9] * 65536 + data[idx + 10] * 256 + data[idx + 11];
    }

    var handsetData = {
        serial: "Not Connected",
        index: {
            id: 1,
            offset: 0,
            max: 2500000,
            maxInLbs: 8,
            loadPercent: 0,
            samples: null
        },
        thumb: {
            id: 0,
            offset: 0,
            max: 2500000,
            maxInLbs: 16,
            loadPercent: 0,
            samples: null
        },
        pinky: {
            id: 2,
            offset: 0,
            max: 2500000,
            maxInLbs: 8,
            loadPercent: 0,
            samples: null
        }        
    };

function Handset() {
  
  this.cordova = new CordovaService();
  
  this.indexPct = 0; 
  
  this.thumbPct = 0;
  
  this.pinkyPct = 0;

  this.ping = () => {
  
                this.cordova.native.serial.writeHex("AA0300002940", handsetInstance.ping, () => setTimeout(handsetInstance.init, 1000));
  };
  
 this.init = () => {
        this.cordova.native.serial.requestPermission(() => {
            this.cordova.native.serial.open({ baudRate: 460800 }, () => {
                this.cordova.native.serial.registerReadCallback(
                    function success(data) {
                        var view = new Uint8Array(data);
                        if (view[1] === 2) {
                            if (view[7] >= 77) {
                                populateFinger(handsetData.thumb, view, 8);
                                populateFinger(handsetData.index, view, 11);
                                populateFinger(handsetData.pinky, view, 14);
                                if (view[7] > 77) {
                                    var t = "";
                                    for (var j = 26; view[j] !== 0; j++)
                                        t += String.fromCharCode(view[j]);
                                    handsetData.serial = t;
                                }
                            }
                        }
                        if (view[1] === 3) {
                            var length = (view[3] + view[4] * 256) / 9;
                            if (length > 0) {
                                var tt = 0;
                                var ti = 0;
                                var tp = 0;
                                for (var i = 7; i < length * 9; i += 9) {
                                    var ts = view[i] + view[i + 1] * 256 + view[i + 2] * 65536;
                                    var is = view[i + 3] + view[i + 4] * 256 + view[i + 5] * 65536;
                                    var ps = view[i + 6] + view[i + 7] * 256 + view[i + 8] * 65536;
                                    tt += ts;
                                    ti += is;
                                    tp += ps;

                                    addSample(ts, handsetData.thumb);
                                    addSample(is, handsetData.index);
                                    addSample(ps, handsetData.pinky);
                                }

                                handsetInstance.thumbPct = handsetData.thumb.loadPercent = parseInt(toPercent(tt, length, this.handset.thumb));
                                handsetInstance.indexPct = handsetData.index.loadPercent = parseInt(toPercent(ti, length, this.handset.index));
                                handsetInstance.pinkyPct = handsetData.pinky.loadPercent = parseInt(toPercent(tp, length, this.handset.pinky));
                             console.log(handsetInstance.thumbPct);
                            }

                        }
                    }, () => setTimeout(handsetInstance.init, 1000));
                this.cordova.native.serial.writeHex("AA0200008B2A", handsetInstance.ping, () => setTimeout(handsetInstance.init, 1000));
            }, () => {
                setTimeout(this.init, 1000);
            });
        }, () => {
            setTimeout(this.init, 1000);
        });
    };

   

    

}
var handsetInstance = new Handset();
export class HandsetService {
  data: any = handsetInstance;
}