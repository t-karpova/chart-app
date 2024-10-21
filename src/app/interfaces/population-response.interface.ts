import {PopulationItem} from './population-item.interface';
import {PopulationSource} from './population-source.interface';

export interface PopulationResponse {
  data: PopulationItem[];
  source: PopulationSource[];
}
