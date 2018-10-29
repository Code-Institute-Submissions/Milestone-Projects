describe("Test navbar brand logo and drop-down menu items are not displayed on screen.", function() {
  
  describe('Navbar brand logo' ,function() {
    it('should not be displayed on screen.', function() {
      expect($('.navbar-brand').is(':visible')).toBe(false);
    });
  
  });
    
  describe('Navbar drop-down menu item' ,function() {
    it('should not be displayed on screen.', function() {
      expect($('.navbar-toggler').is(':visible')).toBe(false);
    });
  
  });
  
});