import { Buffer } from 'buffer';
/**
 * @todo implementar este servicio como una clase
 *
 */
 class RRPService {
    /**
     *
     */
    encodeRRP(data) {
      const rrp = this.buildRRP(data);
      const rrpBuffer = Buffer.from(rrp);
      return rrpBuffer.toString('base64');
    }
  
    buildRRP(data) {
      const params = {
        workOrder: data.workId,
        rrpDate: this.buildRRPOrderDate(data.orderDate),
        warehouse: {
          in: 'ALMACEN',
          out: 'ALMACEN',
          decrease: 'ALMACEN',
        },
        concept: {
          in: 'Produccion (Entrada)',
          out: 'Produccion (salida)',
          decrease: 'Merma (entrada)',
        },
        units: data.items.toString() + '.000',
        decreaseUnits: '.000',
        issue: '',
        desc: data.description,
        startDate: this.buildRRPDate(data.start),
        endDate: this.buildRRPDate(data.end),
        startSetupDate: this.buildRRPDate(data.setupStart),
        endSetupDate: this.buildRRPDate(data.setupEnd),
      };
  
      const rrp =
        `<RRP>` +
        `<TraIndFaId>${params.workOrder}</TraIndFaId>` +
        `<Fecha>${params.rrpDate}</Fecha>` +
        `<TipoDocto>P</TipoDocto>` +
        `<AlmacenSal>${params.warehouse.out}</AlmacenSal>` +
        `<AlmacenEnt>${params.warehouse.in}</AlmacenEnt>` +
        `<AlmacenMer>${params.warehouse.decrease}</AlmacenMer>` +
        `<ConceptoSal>${params.concept.out}</ConceptoSal>` +
        `<ConceptoEnt>${params.concept.in}</ConceptoEnt>` +
        `<ConceptoMer>${params.concept.decrease}</ConceptoMer>` +
        `<Unidades>${params.units}</Unidades>` +
        `<UnidadesM>${params.decreaseUnits}</UnidadesM>` +
        `<Incidencia>Demo</Incidencia>` +
        `<Descripcion>${params.desc}</Descripcion>` +
        `<FechaHoraIni>${params.startDate}</FechaHoraIni>` +
        `<FechaHoraFin>${params.endDate}</FechaHoraFin>` +
        `<FechaHoraSetUpTimeIni>${params.startSetupDate}</FechaHoraSetUpTimeIni>` +
        `<FechaHoraSetUpTimeFin>${params.endSetupDate}</FechaHoraSetUpTimeFin>` +
        `</RRP>`;
      return rrp;
    }
  
    buildRRPOrderDate(strDate) {
      if (strDate === '') return '';
      const date = new Date(Date.parse(strDate));
  
      return (
        this.zerosAtLeft(date.getDate(), 2) +
        '/' +
        this.zerosAtLeft(date.getMonth() + 1, 2) +
        '/' +
        date.getFullYear()
      );
    }
  
    buildRRPDate(strDate) {
      if (strDate === '') return '';
      const date = new Date(Date.parse(strDate));
  
      return (
        this.zerosAtLeft(date.getDate(), 2) +
        '/' +
        this.zerosAtLeft(date.getMonth() + 1, 2) +
        '/' +
        date.getFullYear() +
        ' ' +
        date.getHours() +
        ':' +
        this.zerosAtLeft(date.getMinutes(), 2) +
        ':' +
        this.zerosAtLeft(date.getSeconds(), 2) +
        
        (date.getHours() >= 12 ? ' p.m.' : ' a.m.')
      );
    }
  
    zerosAtLeft(num, len) {
      let ans = '' + num;
      while (ans.length < len) {
        ans = '0' + ans;
      }
      return ans;
    }
  }
  
  export { RRPService };
  