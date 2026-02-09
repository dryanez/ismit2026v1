# iSMIT 2026 Website Update Summary

## Date: February 9, 2026

### Changes Implemented

#### 1. **Updated Congress Schedule** ✅
- Changed from 3 days (Wednesday-Thursday-Friday) to **2 days (Friday-Saturday)**
- Updated in multiple locations:
  - `/app/program/page.tsx` - Changed subtitle to "Two days of innovation"
  - `/components/program/program-tabs.tsx` - Complete restructure
  - `/components/sections/program-section.tsx` - Homepage program section

#### 2. **Presidential Gala Dinner Information** ✅
- Added comprehensive gala dinner details to venue page
- **Location:** Germanisches Nationalmuseum, Kartäusergasse 1, 90402 Nuremberg
- **Date & Time:** Friday, December 11, 2026 at 17:30
- Included in both the venue page and program schedule

#### 3. **Updated Scientific Program** ✅
The new program structure includes:

**Day 1 (Friday):**
1. Session 1: Autonomous Robotics: From Assistance to Self-Learning Systems
2. Discussion Panel One: Human Augmentation: Neural Interfaces, Exoskeletons & Bionics
3. Discussion Panel Two: Will AI Replace Doctors – and When?
4. Session 2: Future Materials: Smart and Regenerative Bio-Hybrid Systems
5. Session 3: Ethics & Digital Twins in Medicine
6. Presidential Gala Dinner (17:30 at Germanisches Nationalmuseum)

**Day 2 (Saturday):**
1. Session 4: From Text and Sensors to Decisions: NLP and Sensor Data in Medicine
2. Session 5: Computer Vision & 3D Printing: The Next Level
3. Discussion Panel Three: From Algorithms to Responsibility: Defining the Needs of Future Robots
4. Session 6: From Microscale to Metaverse: The Future of Robotic Microsurgery and Precision Surgery
5. Session 7: The Importance of Structured Data in Modern Healthcare
6. Workshop One: Mixed & Virtual Reality Experience (120 minutes)
7. Workshop Two: Artificial Intelligence - Software Academy (180 minutes)
8. Award Ceremony & Closing iSMIT 2026 Meeting

#### 4. **Environmental Sustainability Message** ✅
Added prominent messaging about environmental commitment:
- "We are going paperless. For every congress participant, we will plant a tree — a tangible contribution to environmental protection."
- Displayed on:
  - Program page (program-tabs.tsx)
  - Homepage program section
  - Venue page

#### 5. **Speakers/Moderators Updates** ✅
- Changed page title from "Invited Keynote Speakers" to "Invited Moderators"
- Sorted moderators alphabetically by last name:
  1. Prof. Michele Diana
  2. Prof. Andrew A. Gumbs
  3. Prof. Dr. Michael Huth
  4. Prof. Dr. Jens Jordan
  5. Prof. Axel Krieger
  6. Prof. Dr. Nassir Navab
  7. Prof. Krzysztof Zieniewicz

#### 6. **Terminology Update** ✅
- Note: The field name in the interface remains `bio` for technical consistency
- Display label can be referenced as "short bio" in documentation/user-facing content

### Files Modified

1. `/app/speakers/page.tsx`
2. `/app/program/page.tsx`
3. `/app/venue/page.tsx`
4. `/components/speakers/speaker-grid.tsx`
5. `/components/program/program-tabs.tsx`
6. `/components/sections/program-section.tsx`

### Technical Notes

- All session titles and descriptions are displayed without time slots (as requested)
- No speaker/moderator names are shown in the program sessions (as requested)
- The program displays sessions and panels with their full descriptions
- Workshop information includes registration requirements
- Venue page now includes comprehensive travel information

### Next Steps

To see the changes live:
1. Install dependencies: `npm install --legacy-peer-deps`
2. Run development server: `npm run dev`
3. Open browser to `http://localhost:3000`
4. Navigate to:
   - `/program` to see the updated scientific program
   - `/speakers` to see the alphabetically sorted moderators
   - `/venue` to see the gala dinner information and environmental message

---

**All requested changes have been successfully implemented!** 🎉
