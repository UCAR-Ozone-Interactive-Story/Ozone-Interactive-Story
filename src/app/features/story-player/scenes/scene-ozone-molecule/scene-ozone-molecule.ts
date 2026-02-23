import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';
import { StoryService } from '@core/story.service';
import { SceneNavigation } from '@shared/ui/scene-navigation/scene-navigation';


@Component({
  selector: 'app-ozone-molecule',
  imports: [NarrativeText, TranslateModule, SceneNavigation],
  templateUrl: './scene-ozone-molecule.html',
  styleUrl: './scene-ozone-molecule.scss',
})
export class OzoneMolecule {
  story = inject(StoryService);
}