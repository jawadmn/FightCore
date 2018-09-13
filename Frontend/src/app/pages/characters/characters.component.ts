import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TabItem } from '../../components/tabs/tab/tab-item';
import { TabExampleComponent } from '../../components/tabs/tab-example/tab-example.component';
import { TabsInterface } from '../../components/tabs/tabs.interface';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  tabItems: TabsInterface[];     // Tabs to generate
  tabsDisabled: boolean = true;  // Defines if tabs should be disabled. Will be used to disable tabs if no character selected
    
  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("Characters");

    // Initialize tabs
    this.tabItems = [
      {
        title: "Dashboard",
        tabItem: new TabItem(TabExampleComponent, {testData: "First tab data"})
      },
      {
        title: "Basics",
        tabItem: new TabItem(TabExampleComponent, {testData: "Second tab data"}),
        canDisable: true
      },
      {
        title: "Moves",
        tabItem: new TabItem(TabExampleComponent, {testData: "Third tab data"}),
        canDisable: true
      },
      {
        title: "Combos & Tech",
        tabItem: new TabItem(TabExampleComponent, {testData: "Fourth tab data"}),
        canDisable: true
      },
      {
        title: "Matchups",
        tabItem: new TabItem(TabExampleComponent, {testData: "Fifth tab data"}),
        canDisable: true
      }
    ];
  }

}
