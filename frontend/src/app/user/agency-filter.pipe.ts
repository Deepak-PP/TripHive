import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'agencyFilter',
})
export class AgencyFilterPipe implements PipeTransform {
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
  }
}
