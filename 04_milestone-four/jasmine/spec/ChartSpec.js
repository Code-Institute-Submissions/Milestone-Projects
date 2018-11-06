describe("Test Google chart and associated filter elements are rendered and displayed on screen.", function() {
  
  describe('Google chart container ID' ,function() {
    it('should be rendered and displayed on screen.', function() {
      expect(getChartContainer()).not.toBeNull();
    });
  
  });
  
  describe('Chart elements' ,function() {
    it('chart slider filter should have a height greater than 0.', function() {
      expect($("#slider_div").has('.google-visualization-controls-slider-horizontal').attr('height')).not.toBe("0");
    });
    
    it('chart slider filter should have a width greater than 0.', function() {
      expect($("#slider_div").has('.google-visualization-controls-slider-horizontal').attr('width')).not.toBe("0");
    });
  
    it('chart category filter should have a height greater than 0.', function() {
      expect($("#categoryPicker_div").has('.google-visualization-controls-categoryfilter').attr('height')).not.toBe("0");
    });
    
    it('chart category filter should have a width greater than 0.', function() {
      expect($("#categoryPicker_div").has('.google-visualization-controls-categoryfilter').attr('width')).not.toBe("0");
    });
    
    it('chart area should have a height greater than 0.', function() {
      expect($("#chart_div").has('div').attr('height')).not.toBe("0");
    });

    it('chart area should have a width greater than 0.', function() {
      expect($("#chart_div").has('div').attr('width')).not.toBe("0");
    });
    
    it('chart table should have a height greater than 0.', function() {
      expect($("#table_div").has('.google-visualization-table').attr('height')).not.toBe("0");
    });

    it('chart table should have a width greater than 0.', function() {
      expect($("#table_div").has('.google-visualization-table').attr('width')).not.toBe("0");
    });
    
  });
    
  // Return chart container ID
  function getChartContainer() {
    return document.getElementById("dashboard_div");
  }
  
});