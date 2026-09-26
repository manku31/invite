# Invitation design notes

The provided 40.9-second reference film moves through four illustrated spaces: a pink sandstone haveli facade, a fountain courtyard, a carved lakeside pavilion with the couple, and a lake with two swans. Slow forward camera movement, a brief blur transition, centered serif copy, large script names, and drifting rose petals connect the scenes. We omit the source studio branding and its promotional end card.

This implementation reinterprets those scenes as a scrollable invitation: a palace opening, intimate paper-textured couple and family pages, a story timeline, ceremonial stationery, an illustrated venue, memories, and a quiet closing. Architecture, original artwork, live text, ornamental SVGs, petals, and motion are separate layers. No reference image or video is served as the website itself.

Palette: ivory #faf6ed, parchment #f0e5d3, dusty rose #e8c8bd, terracotta #a46b58, maroon #713e44, sage #677463, antique gold #a58a53, and dark brown #493b35.

Typography: self-hosted Cormorant Garamond for editorial headings, Great Vibes for names, and DM Sans for practical labels and form controls.

The additional 37.467-second reference (`From Klickpin.com- Gorgeous capsule wardrobe ideas…mp4`) shows an ivory floral gatefold invitation on a phone. A fine gold center seam and oval embossed seal establish a tactile paper cover. Two panels open outward, followed by restrained framed pages that reveal the date, venue, family, and RSVP as the guest moves downward. The phone, hand, promotional text, and surrounding room are not part of the design.

Opening sequence: show only the closed embossed floral cover and live seal monogram, with scrolling locked. A tap lifts and fades the seal; the panels rotate outward over 2.4 seconds. The palace appears underneath after 1.05 seconds, and the cover finishes at 2.85 seconds. The invitation text, names, date, and scroll cue reveal in sequence. After a 2.7-second pause, an optional seven-second drift introduces the couple. Touch, wheel, pointer, or navigation-key input immediately cancels that drift. Reduced motion opens directly on activation and removes guided scrolling and decorative motion.

Connected scenes: soft ivory/rose boundaries, fine botanical vines, paired birds, and small italic chapter lines link the opening, couple, story, and celebration pages. Original SVG butterflies, distant birds, wind-blown leaves, and thin breeze lines stay mostly at the outer edges. Portraits move only 20 pixels across their full scroll journey. Wheel easing applies to fine-pointer devices; touch and keyboard scrolling retain native behavior. The illustrated couple remains the human focus of the invitation.

Mobile: central architectural crop, stacked names, full-height opening, compact menu, vertical timeline, two-column staggered gallery, and stacked form/venue content. Desktop: wider architectural context, compact navigation, editorial columns, centered timeline, and multi-column event stationery.

All personal information is demonstration content in config/wedding.ts. Replace it before sharing a real invitation. The included illustrations represent the visual world of the invitation; they are not photographs of the configured venue or couple.
