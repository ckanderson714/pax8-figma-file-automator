/// <reference types="@figma/plugin-typings" />

// Show the plugin UI
figma.showUI(__html__, { width: 350, height: 300 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'create-cover') {
    try {
      // Create a new frame for the cover page
      const frame = figma.createFrame();
      frame.name = "📄 Cover Page";
      frame.resize(1440, 1024);
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
      frame.x = 0;
      frame.y = 0;

      // Load the font before creating text
      await figma.loadFontAsync({ 
        family: msg.fontFamily || "Roboto", 
        style: msg.fontStyle || "Regular" 
      });

      // Add title text node
      const title = figma.createText();
      title.characters = msg.title || "New Project";
      title.fontName = { 
        family: msg.fontFamily || "Roboto", 
        style: msg.fontStyle || "Regular" 
      };
      title.fontSize = 32;
      title.x = 40;
      title.y = 40;

      frame.appendChild(title);
      figma.currentPage.appendChild(frame);

      figma.notify("✅ Cover page created!");
    } catch (error) {
      console.error("Plugin Error:", error);
      figma.notify("⚠️ Failed to create cover page. Check the font name and style.");
    }

    // Optional: Close the plugin after completion
    figma.closePlugin();
  }
};
