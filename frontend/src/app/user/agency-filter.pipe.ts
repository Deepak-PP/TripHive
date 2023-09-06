import { Pipe, PipeTransform } from '@angular/core';
import { UserAgenciesViewComponent } from './user-agencies-view/user-agencies-view.component';

@Pipe({
  name: 'agencyFilter',
})
export class AgencyFilterPipe implements PipeTransform {
  constructor(private agencyViewComp:UserAgenciesViewComponent) { }
  transform(agencies: any[], searchTerm: string): any[] {
    if (!agencies || !searchTerm) {
      return agencies;
    }

    searchTerm = searchTerm.toLowerCase();

    return agencies.filter((agency) => {
      // Customize this condition to match your filter criteria
      return (
        agency.agencyName.toLowerCase().includes(searchTerm) ||
        agency.services.some((service) =>
          service.serviceName.toLowerCase().includes(searchTerm)
        ) ||
        agency.pricePerHead.toString().includes(searchTerm) ||
        agency.maxCapacity.toString().includes(searchTerm)
      );
    });

    if (this.agencyViewComp.agencies.length === 0) {
      return [
        {
          agencyName: 'No Data Found',
        },
      ];
    }

    return agencies;
  }
}
