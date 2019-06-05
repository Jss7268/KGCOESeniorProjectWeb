import { Injectable } from '@angular/core';
import { Device } from '../classes/device';
import { Experiment } from '../classes/experiment';
import { OutputType } from '../classes/output-type';

@Injectable({
  providedIn: 'root'
})
export class TooltipService {

  constructor() { }

  generateDeviceTooltip(device: Device) {
    return `Email: ${device.email}\nId: ${device.id}`;
 }

  generateExperimentTooltip(experiment: Experiment) {
    return `Notes: ${experiment.notes}\nId: ${experiment.id}`;
 }

  generateOutputTypeTooltip(outputType: OutputType) {
    return `Units: ${outputType.units}`;
 }
}
