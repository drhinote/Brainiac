import { CordovaService } from './cordova.service';
import {Observable} from 'rxjs';

    function fix(val) {
      return val-(Math.floor(val/8388608)*16777216);
    }

    function addSample(sample, finger) {
        if (finger.samples) finger.samples.push(sample);
    }
  
    function toPercent(total, count, finger) {
        return ((total / count - finger.offset) / (finger.max - finger.offset) * 100).toFixed(1);
    }

    function populateFinger(finger, data, idx, isPadded) {
        finger.offset = fix(data.charCodeAt(idx) * 65536 + data.charCodeAt(idx + 1) * 256 + data.charCodeAt(idx + 2));
        finger.max = fix(data.charCodeAt(idx + 9) * 65536 + data.charCodeAt(idx + 10) * 256 + data.charCodeAt(idx + 11));
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
                this.cordova.native.serial.writeHex("AA0300002940", () => setTimeout(handsetInstance.ping), () => setTimeout(handsetInstance.init, 1000));
  };
  
 this.init = () => {
        this.cordova.native.serial.requestPermission(() => {
            this.cordova.native.serial.open({ baudRate: 460800 }, () => {
                this.cordova.native.serial.registerReadCallback(
                    function success(data) {
                        var view: string = data;
                        if (view.charCodeAt(1) === 2) {
                            if (view.charCodeAt(7) > 76) {
                              
                                populateFinger(handsetData.thumb, view, 8, view.charCodeAt(7) == 78);
                                populateFinger(handsetData.index, view, 11, view.charCodeAt(7) == 78);
                                populateFinger(handsetData.pinky, view, 14, view.charCodeAt(7) == 78);
                                if (view.charCodeAt(7) > 77) {
                                    var t = "";
                                    for (var j = 26; view.charCodeAt(j) !== 0; j++)
                                        t += String.fromCharCode(view.charCodeAt(j));
                                    handsetData.serial = t;
                                }
                            }
                        }
                        if (view.charCodeAt(1) === 3) {
                            var length = (view.charCodeAt(3) + view.charCodeAt(4) * 256) / 9;
                            if (length > 0) {
                                var tt = 0;
                                var ti = 0;
                                var tp = 0;
                                for (var i = 7; i < length * 9; i += 9) {
                                    var ts = fix(view.charCodeAt(i) + view.charCodeAt(i + 1) * 256 + view.charCodeAt(i + 2) * 65536);
                                    var ish = fix(view.charCodeAt(i + 3) + view.charCodeAt(i + 4) * 256 + view.charCodeAt(i + 5) * 65536);
                                    var ps = fix(view.charCodeAt(i + 6) + view.charCodeAt(i + 7) * 256 + view.charCodeAt(i + 8) * 65536);
                                    tt += ts;
                                    ti += ish;
                                    tp += ps;

                                    addSample(ts, handsetData.thumb);
                                    addSample(ish, handsetData.index);
                                    addSample(ps, handsetData.pinky);
                                }

                                handsetInstance.thumbPct = Math.min(Math.max(handsetData.thumb.loadPercent = parseInt(toPercent(tt, length, handsetData.thumb)),0),100);
                                handsetInstance.indexPct = Math.min(Math.max(handsetData.index.loadPercent = parseInt(toPercent(ti, length, handsetData.index)),0),100);
                                handsetInstance.pinkyPct = Math.min(Math.max(handsetData.pinky.loadPercent = parseInt(toPercent(tp, length, handsetData.pinky)),0),100);
                                
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