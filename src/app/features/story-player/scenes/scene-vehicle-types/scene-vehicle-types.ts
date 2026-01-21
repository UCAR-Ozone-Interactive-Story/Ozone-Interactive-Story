import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';

@Component({
  selector: 'app-scene-vehicle-types',
  imports: [NarrativeText, TranslateModule],
  templateUrl: './scene-vehicle-types.html',
  styleUrl: './scene-vehicle-types.scss',
})
export class SceneVehicleTypes {}
