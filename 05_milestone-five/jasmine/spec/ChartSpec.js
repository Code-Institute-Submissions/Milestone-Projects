describe("Test DC charts and SVG elements are rendered and displayed on screen.", function() {
  
  describe('DC Chart classes' ,function() {
    it('should be rendered and displayed on screen.', function() {
      expect(getCharts()).not.toBeNull();
    });
  
  });
  
  describe('Chart SVG elements' ,function() {
    it('chart 1 should have a height greater than 0.', function() {
      expect($("#chart-tickets-per-topic").has('svg').attr('height')).not.toBe("0");
    });
  
    it('chart 1 should have a width greater than 0.', function() {
      expect($("#chart-tickets-per-topic").has('svg').attr('width')).not.toBe("0");
    });
    
    it('chart 2 should have a height greater than 0.', function() {
      expect($("#chart-tickets-per-topic2").has('svg').attr('height')).not.toBe("0");
    });
  
    it('chart 2 should have a width greater than 0.', function() {
      expect($("#chart-tickets-per-topic2").has('svg').attr('width')).not.toBe("0");
    });
    
    it('chart 3 should have a height greater than 0.', function() {
      expect($("#chart-tickets-per-topic3").has('svg').attr('height')).not.toBe("0");
    });
  
    it('chart 3 should have a width greater than 0.', function() {
      expect($("#chart-tickets-per-topic3").has('svg').attr('width')).not.toBe("0");
    });
  
  });
    
  // Return charts 
  function getCharts() {
    return document.getElementsByClassName("dc-chart");
  }
  
});