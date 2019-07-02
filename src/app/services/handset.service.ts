import { Injectable, Output, EventEmitter } from '@angular/core';
import { CordovaService } from './cordova.service';

@Injectable()
export class HandsetService {

  public cordova: CordovaService;

  constructor(cordova: CordovaService) {
    this.cordova = cordova;
    this.init();
  }

  @Output() indexPct = new EventEmitter<Number>();
  
  @Output() thumbPct = new EventEmitter<Number>();
  
  @Output() pinkyPct = new EventEmitter<Number>();

  @Output() dataAvailable = new EventEmitter<any>();
  
  @Output() connected = new EventEmitter<any>();
  
  @Output() disconnected = new EventEmitter<any>();
  
  ping() {
    this.cordova.native.serial.writeHex("AA0300002940", () => setTimeout(this.ping, 60), () => setTimeout(this.init, 1000));
  }
  
  init() {
        this.cordova.native.serial.requestPermission(() => {
            this.cordova.native.serial.open({ baudRate: 460800 }, () => {
                this.cordova.native.serial.registerReadCallback(
                    function success(data) {
                        var view = new Uint8Array(data);
                        if (view[1] === 2) {
                            if (view[7] >= 77) {
                                this.populateFinger(this.handset.thumb, view, 8);
                                this.populateFinger(this.handset.index, view, 11);
                                this.populateFinger(this.handset.pinky, view, 14);
                                if (view[7] > 77) {
                                    var t = "";
                                    for (var j = 26; view[j] !== 0; j++)
                                        t += String.fromCharCode(view[j]);
                                    this.handset.serial = t;
                                }
                                this.connected(this.handset);
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

                                    this.addSample(ts, this.handset.thumb);
                                    this.addSample(is, this.handset.index);
                                    this.addSample(ps, this.handset.pinky);
                                }

                                this.handset.thumb.loadPercent = this.toPercent(tt, length, this.handset.thumb);
                                this.handset.index.loadPercent = this.toPercent(ti, length, this.handset.index);
                                this.handset.pinky.loadPercent = this.toPercent(tp, length, this.handset.pinky);
                                this.dataAvailable(this.handset);
                                this.indexPct(this.handset.index.loadPercent);
                                this.thumbPct(this.handset.thumb.loadPercent);
                                this.pinkyPct(this.handset.pinky.loadPercent);
                            }

                        }
                    }, () => setTimeout(this.init, 1000));
                this.cordova.native.serial.writeHex("AA0200008B2A", this.ping, () => setTimeout(this.init, 1000));
            }, () => {
                setTimeout(this.init, 1000);
            });
        }, () => {
            setTimeout(this.init, 1000);
        });
    };

    handset: any = {
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
    }

    addSample(sample, finger) {
        if (finger.samples) finger.samples.push(sample);
    }
  
    toPercent(total, count, finger) {
        return ((total / count - finger.offset) / (finger.max - finger.offset) * 100).toFixed(1);
    }

    populateFinger(finger, data, idx) {
        finger.offset = data[idx] * 65536 + data[idx + 1] * 256 + data[idx + 2];
        finger.max = data[idx + 9] * 65536 + data[idx + 10] * 256 + data[idx + 11];
    }

}
