// optional `menuName` overrides default name for menu item if it's defined
// hideInMenu hides item in menu
// hideInOverview hides item in Overview page

export const CARDS = [
  {
    name: 'Card - Cards',
    menuName: 'Cards',
    desc: 'A card can be used to display content related to a single subject. The content can consist of multiple elements of varying types and sizes.',
    path: '/app/card/cards'
  },
  {
    name: 'Card - Image Cards',
    menuName: 'Image Cards',
    desc: 'Card component for displaying image and related content',
    path: '/app/card/image-cards'
  },
  {
    name: 'Card - Form Cards',
    menuName: 'Form Cards',
    desc: 'Card component for displaying form content',
    path: '/app/card/form-cards'
  },
  {
    name: 'Card - Blog Cards (Grid)',
    menuName: 'Blog Cards (Grid)',
    desc: 'Card component for displaying blog content',
    path: '/app/card/blog-cards-grid'
  },
  {
    name: 'Card - Blog Cards (List)',
    menuName: 'Blog Cards (List)',
    desc: 'Card component for displaying blog content',
    path: '/app/card/blog-cards-list'
  },
  {
    name: 'Card - Number Cards',
    menuName: 'Number Cards',
    desc: 'Card component for displaying number and related content',
    path: '/app/card/number-cards'
  },
  {
    name: 'Card - Portfolio Cards',
    menuName: 'Portfolio Cards',
    desc: 'Card component for displaying profile content',
    path: '/app/card/portfolio-cards'
  },
  {
    name: 'Card - Icon Cards',
    menuName: 'Icon Cards',
    desc: 'Card component for displaying Icon and related content',
    path: '/app/card/icon-cards'
  },
  {
    name: 'Card - Product Cards (Grid)',
    menuName: 'Product Cards (Grid)',
    desc: 'Card component for displaying products',
    path: '/app/card/product-cards-grid'
  },
  {
    name: 'Card - Product Cards (List)',
    menuName: 'Product Cards (List)',
    desc: 'Card component for displaying products',
    path: '/app/card/product-cards-list'
  },
  {
    name: 'Card - Profile Cards',
    menuName: 'Profile Cards',
    desc: 'Card component for displaying portfolio',
    path: '/app/card/profile-cards'
  },
]

export const LAYOUTS = [
  {
    name: 'Layout - Header',
    menuName: 'Header',
    desc: 'The header section of App layout',
    path: '/app/layout/header',
  },
  {
    name: 'Layout - Footer',
    menuName: 'Footer',
    desc: 'The footer section of App layout',
    path: '/app/layout/footer'
  },
  {
    name: 'Layout - Sidenav',
    menuName: 'Sidenav',
    desc: 'The sidenav section of App layout',
    path: '/app/layout/sidenav'
  },
  {
    name: 'Layout - Page / Content',
    menuName: 'Page / Content',
    desc: 'The content / page section of App layout',
    path: '/app/layout/page'
  },
  {
    name: 'Layout - Page (Fullscreen)',
    menuName: 'Page (Fullscreen)',
    desc: 'A fullscreen page, without App header, footer or sidenav',
    path: '/app/layout/page-fullscreen'
  }, 
  {
    name: 'Layout - Page with Tabs',
    menuName: 'Page (with Tabs)',
    desc: 'A standard page with tabs for different views',
    path: '/app/layout/page-with-tabs'
  },
  {
    name: 'Layout - Page with Breadcrumb',
    menuName: 'Page (with Breadcrumb)',
    desc: 'A standard page with breadcrumb',
    path: '/app/layout/page-with-breadcrumb'
  },
  {
    name: 'Grid System',
    menuName: 'Grid System',
    desc: "Bootstrap's powerful mobile-first flexbox grid to build layouts of all shapes and sizes",
    path: '/app/layout/grid'
  },
  {
    name: 'List / List Group',
    menuName: 'Lists',
    desc: 'A list can be used to display content related to a single subject. The content can consist of multiple elements of varying type and size.',
    path: '/app/layout/lists'
  },
]

const UIICON = [
  {
    name: 'Icon - Material Icons',
    menuName: 'Material Icons',
    desc: 'Material design icon assets',
    path: '/app/foundation/icon/material-icons'
  },
  {
    name: 'Icon - Social Icons',
    menuName: 'Social Icons',
    desc: 'Social icon assets',
    path: '/app/foundation/icon/social-icons'
  }
]

const UINAVIGATION = [
  {
    name: 'Breadcrumb',
    desc: 'A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy.',
    path: '/app/foundation/navigation/breadcrumb'
  },
  {
    name: 'App Bar',
    desc: 'The App Bar displays information and actions relating to the current screen.',
    path: '/app/foundation/navigation/app-bar'
  },
  {
    name: 'Bottom Navigation',
    desc: 'Bottom navigation bars allow movement between primary destinations in an app.',
    path: '/app/foundation/navigation/bottom-navigation'
  },
  {
    name: 'Menu',
    desc: 'Menus display a list of choices on temporary surfaces.',
    path: '/app/foundation/navigation/menu'
  },
]

export const FOUNDATION = [
  {
    name: 'Typography',
    desc: 'Typography is one of the most basic foundational part of a interface design system.',
    path: '/app/foundation/typography',
  },
  {
    name: 'Color Palette',
    desc: 'Color palette of Ant Design',
    path: '/app/foundation/color-palette'
  },
  {
    name: 'Elevation & Shadows',
    desc: 'Elevation is the relative depth, or distance, between two surfaces along the z-axis.',
    path: '/app/foundation/elevation'
  },
  {
    name: 'Button / Button Group',
    menuName: 'Buttons',
    desc: 'A button means an operation (or a series of operations). Clicking a button will trigger corresponding business logic.',
    path: '/app/foundation/buttons'
  },
  {
    name: 'Boxes',
    desc: 'A box is often used as a container to display content, it works like a Card.',
    path: '/app/foundation/boxes'
  },
  {
    name: 'Icon',
    path: '/app/foundation/icon',
    children: UIICON
  },
  {
    name: 'Navigation',
    path: '/app/ui/navigation',
    children: UINAVIGATION
  },
]

const UIHOVER = [
  {
    name: 'Hover',
    menuName: 'Basic',
    desc: 'A mouse hover, also called just hover, triggers an event when a user places a mouse over a designated area',
    path: '/app/ui/hover/hover'
  }, {
    name: 'Hover - Link Hover',
    menuName: 'Link Hover',
    desc: 'Link hover effect is triggered when a user places a mouse over a link',
    path: '/app/ui/hover/link-hover'
  }, {
    name: 'Hover - With Overlay',
    menuName: 'With Overlay',
    desc: 'Overlay content is displayed when a user places a mouse over a designated area',
    path: '/app/ui/hover/with-overlay'
  },
]

const UIMORE = [
  {
    name: 'Avatars',
    desc: 'Avatars can be used to represent people or objects. It supports images, Icons, or letters.',
    path: '/app/ui/more/avatars'
  },
  {
    name: 'BackTop',
    desc: 'BackTop makes it easy to go back to the top of the page.',
    path: '/app/ui/more/back-top',
    hideInMenu: true
  },
  {
    name: 'Badges / Labels',
    desc: 'Badge normally appears in proximity to notifications or user avatars with eye-catching appeal, typically displaying unread messages count.',
    path: '/app/ui/more/badges'
  },
  {
    name: 'Call to Action',
    desc: 'A call to action (CTA) is an instruction to the audience designed to provoke an immediate response.',
    path: '/app/ui/more/call-to-action'
  },
  {
    name: 'Paper',
    desc: 'In Material Design, the physical properties of paper are translated to the screen.',
    path: '/app/ui/more/paper',
    hideInMenu: true
  },
]

export const UITIMELINE = [
  {
    name: 'Timeline / Streamline',
    desc: 'Vertical display timeline.',
    path: '/app/ui/timeline/timeline',
    hideInOverview: true
  },
  {
    name: 'Timeline (Large)',
    desc: 'Large vertical display timeline.',
    path: '/app/ui/timeline/timeline-lg'
  },
]


const UIUTILITY = [
  {
    name: 'Overlay',
    desc: "Overlays are often used when you want to make the content on top of an image more readable. It's used on components like Image Cards, Covers, Hero etc.",
    path: '/app/ui/utility/overlay'
  },
  {
    name: 'Background Color',
    desc: 'Convey meaning through color with a handful of color utility classes.',
    path: '/app/ui/utility/color'
  },
  {
    name: 'Spacing',
    desc: 'A wide range of shorthand responsive margin and padding utility classes to modify an element’s appearance.',
    path: '/app/ui/utility/spacing'
  },
  {
    name: 'Gradient Backgrounds',
    desc: 'Convey meaning through color with a handful of color utility classes.',
    path: '/app/ui/utility/gradient-background'
  },
  {
    name: 'Divider',
    desc: 'A divider line separates different content.',
    path: '/app/ui/utility/divider'
  },
]

export const UIKIT = [
  {
    name: 'Callouts',
    desc: 'A callout is often a short piece of text set in larger type or with colorful background and intended to attract attention.',
    path: '/app/ui/callouts'
  },
  {
    name: 'Carousel',
    desc: 'A carousel component. Scales with its container.',
    path: '/app/ui/carousel'
  },
  {
    name: 'Covers',
    desc: 'A lightweight, flexible component that can optionally extend the entire viewport to showcase key marketing messages on your site.',
    path: '/app/ui/covers'
  },
  {
    name: 'Expansion Panels / Collapse / Accordion',
    menuName: 'Expansion Panels',
    desc: 'An expansion panel is a lightweight container that may either stand alone or be connected to a larger surface, such as a card.',
    path: '/app/ui/expansion-panels'
  },
  {
    name: 'Feature Callouts',
    desc: 'A callout for feature',
    path: '/app/ui/feature-callouts'
  },
  {
    name: 'Hover',
    path: '/app/ui/hover',
    children: UIHOVER
  },
  {
    name: 'Jumbotron / Hero',
    desc: 'A lightweight, flexible component that can optionally extend the entire viewport to showcase key marketing messages on your site.',
    path: '/app/ui/jumbotron'
  },
  {
    name: 'Pricing Tables',
    desc: 'A table shows the pricing and corresponding features',
    path: '/app/ui/pricing-tables'
  },  {
    name: 'Sashes',
    desc: 'A sash is a large and usually colorful ribbon or band of material positioned around the content body',
    path: '/app/ui/sashes'
  }, {
    name: 'Tabs',
    desc: 'Tabs make it easy to switch between different views.',
    path: '/app/ui/tabs'
  },  {
    name: 'Testimonials',
    desc: "A testimonial consists of a person's written or spoken statement extolling the virtue of a product.",
    path: '/app/ui/testimonials'
  },
  {
    name: 'Popovers',
    desc: 'The floating card popped by clicking or hovering.',
    path: '/app/ui/popovers'
  },
  {
    name: 'Ribbons',
    desc: 'A ribbon is used primarily as decorative binding for highlighting a piece of information.',
    path: '/app/ui/ribbons'
  },
  {
    name: 'Timeline',
    path: '/app/ui/timeline',
    children: UITIMELINE
  },
  {
    name: 'Tooltips',
    desc: 'A simple text popup tip.',
    path: '/app/ui/tooltips'
  },
  {
    name: 'Utility',
    path: '/app/ui/utility',
    children: UIUTILITY
  },
  {
    name: 'More Components',
    path: '/app/ui/more',
    children: UIMORE
  },
];

const FORMCONTROLS = [
  {
    name: 'Input / Text Fields',
    menuName: 'Text Fields',
    desc: 'A basic widget for getting the user input is a text field. Keyboard and mouse can be used for providing or changing data.',
    path: '/app/form/form-control/text-fields'
  },
  {
    name: 'Rate',
    desc: 'Rate component. Usage: Show evaluation. Or a quick rating operation on something.',
    path: '/app/form/form-control/rate'
  },
  {
    name: 'Switches',
    desc: 'Switching Selector. Usage: If you need to represent the switching between two states or on-off state.',
    path: '/app/form/form-control/switches'
  },
  {
    name: 'Radio Buttons',
    desc: 'Radio buttons. Usage: Used to select a single state in multiple options.',
    path: '/app/form/form-control/radio-buttons'
  },
  {
    name: 'Checkboxes',
    desc: 'Checkbox. Used for selecting multiple values from several options.',
    path: '/app/form/form-control/checkboxes'
  },
  {
    name: 'Selects',
    desc: 'Select component to select value from options.',
    path: '/app/form/form-control/selects'
  },
  {
    name: 'Date Pickers',
    menuName: 'Date & Time Pickers',
    desc: 'By clicking the input box, you can select a time or date from a popup panel.',
    path: '/app/form/form-control/pickers',
  },
  {
    name: 'Time Pickers',
    menuName: 'Date & Time Pickers',
    desc: 'By clicking the input box, you can select a time or date from a popup panel.',
    path: '/app/form/form-control/pickers',
    hideInMenu: true
  },
  {
    name: 'AutoComplete',
    desc: 'Autocomplete function of input field. Usage: When there is a need for autocomplete functionality.',
    path: '/app/form/form-control/autocomplete'
  },
  {
    name: 'Chips / Tags',
    menuName: 'Chips',
    desc: 'Chips are compact elements that represent an input, attribute, or action.',
    path: '/app/form/form-control/chips'
  },
  {
    name: 'Slider',
    desc: 'A Slider component for displaying current value and intervals in range.',
    path: '/app/form/form-control/slider'
  },
  {
    name: 'Upload',
    desc: 'Upload file by selecting or dragging.',
    path: '/app/form/form-control/upload'
  },
]

export const FORMS = [
  {
    name: 'Form Examples',
    desc: 'Form is used to collect, validate, and submit the user input, usually contains various form items including checkbox, radio, input, select, and etc.',
    path: '/app/form/forms'
  },
  {
    name: 'Form Layouts',
    desc: 'Different layout type for forms',
    path: '/app/form/layouts'
  },
  {
    name: 'Form Controls',
    path: '/app/form/form-control',
    badge: 'badge-status-dot badge-info',
    children: FORMCONTROLS
  },
  {
    name: 'Form Validation',
    desc: "Validate status and/or message will be displayed when user's input violate specified validation rules",
    path: '/app/form/validation',
    hideInMenu: true,
    hideInOverview: true
  },
  {
    name: 'Steppers / Wizard',
    desc: 'Stepper is a navigation bar that guides users through the steps of a task.',
    path: '/app/form/steppers'
  }
]

export const FEEDBACKS = [
  {
    name: 'Notification',
    desc: 'Display a notification message globally.',
    path: '/app/feedback/notification'
  },
  {
    name: 'Modal',
    desc: "Modal dialogs. Usage: When requiring users to interact with the application, but without jumping to a new page and interrupting the user's workflow",
    path: '/app/feedback/modal'
  },
  {
    name: 'Dialog',
    desc: "Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks.",
    path: '/app/feedback/dialog'
  },
  {
    name: 'Drawer',
    desc: 'A Drawer is a panel that is typically overlaid on top of a page and slides in from the side. ',
    path: '/app/feedback/drawer'
  },
  {
    name: 'Snackbars',
    desc: 'Snackbars provide brief messages about app processes through a message - typically at the bottom of the screen.',
    path: '/app/feedback/snackbars'
  },
  {
    name: 'Progress',
    desc: 'Display the current progress of an operation flow.',
    path: '/app/feedback/progress'
  },
  {
    name: 'Loaders',
    desc: 'A loader for displaying loading state of a page or a section.',
    path: '/app/feedback/loaders'
  },
]

export const TABELS = [
  {
    name: 'Table - Data Tables',
    menuName: 'Data Tables',
    desc: 'Usage: to display a collection of structured data and to sort, search, paginate, filter data.',
    path: '/app/table/data-tables'
  },
  {
    name: 'Table - Table Styles',
    menuName: 'Table Styles',
    desc: 'A table displays rows of data.',
    path: '/app/table/styles'
  },
  {
    name: 'Table - Responsive Tables',
    menuName: 'Responsive Tables',
    desc: 'A table displays rows of data.',
    path: '/app/table/responsive',
    hideInMenu: true
  },

]

export const CHARTS = [
  {
    name: 'Chart - Line & Area',
    menuName: 'Line & Area',
    desc: 'Line & Area chart',
    path: '/app/chart/line'
  },
  {
    name: 'Chart - Bar',
    menuName: 'Bar',
    desc: 'Bar chart',
    path: '/app/chart/bar'
  },
  {
    name: 'Chart - Pie',
    menuName: 'Pie',
    desc: 'Pie chart',
    path: '/app/chart/pie'
  },
  {
    name: 'Chart - Scatter',
    menuName: 'Scatter',
    desc: 'Scatter chart',
    path: '/app/chart/scatter'
  },
  {
    name: 'Chart - Radar',
    menuName: 'Radar',
    desc: 'Radar chart',
    path: '/app/chart/radar'
  },
  {
    name: 'Chart - Funnel',
    menuName: 'Funnel',
    desc: 'Funnel chart',
    path: '/app/chart/funnel'
  },
  {
    name: 'Chart - Gauge',
    menuName: 'Gauge',
    desc: 'Gauge chart',
    path: '/app/chart/gauge'
  },
  {
    name: 'Chart - Candlestick',
    menuName: 'Candlestick',
    desc: 'Candlestick chart',
    path: '/app/chart/candlestick'
  },
  {
    name: 'Chart - Heatmap',
    menuName: 'Heatmap',
    desc: 'Heatmap chart',
    path: '/app/chart/heatmap'
  },
  {
    name: 'Chart - PictorialBar',
    menuName: 'PictorialBar',
    desc: 'PictorialBar chart',
    path: '/app/chart/pictorial-bar'
  },
  {
    name: 'Chart - Sunburst',
    menuName: 'Sunburst',
    desc: 'Sunburst chart',
    path: '/app/chart/sunburst'
  },
  {
    name: 'Chart - ThemeRiver',
    menuName: 'ThemeRiver',
    desc: 'ThemeRiver chart',
    path: '/app/chart/theme-river'
  },
]

const CALENDAR = [
  {
    name: 'Calendar',
    desc: 'When data is in the form of dates, such as schedules, timetables, prices calendar, lunar calendar. This component also supports Year/Month switch.',
    path: '/app/calendar'
  }
]


export const PAGES = [
  {
    name: 'About',
    path: '/app/page/about'
  }, {
    name: 'About History',
    path: '/app/page/about-history'
  }, {
    name: 'Blog',
    path: '/app/page/blog'
  }, {
    name: 'Services',
    path: '/app/page/services'
  }, {
    name: 'Services v2',
    path: '/app/page/services-v2'
  }, {
    name: 'Careers',
    path: '/app/page/careers'
  }, {
    name: 'Contact',
    path: '/app/page/contact'
  }, {
    name: 'FAQs',
    path: '/app/page/faqs'
  }, {
    name: 'Terms of Services',
    path: '/app/page/terms'
  },
]

export const ECOMMERCE = [
  {
    name: 'Products',
    path: '/app/ecommerce/products'
  }, {
    name: 'Products v2',
    path: '/app/ecommerce/products-v2'
  }, {
    name: 'Invoice',
    path: '/app/ecommerce/invoice'
  }
]

export const USER = [
  {
    name: 'Login',
    path: '/user/login'
  }, {
    name: 'Login v2',
    path: '/user/login-v2'
  }, {
    name: 'Sign Up',
    path: '/user/sign-up'
  }, {
    name: 'Sign Up v2',
    path: '/user/sign-up-v2'
  }, {
    name: 'Forgot Password',
    path: '/user/forgot-password'
  }, {
    name: 'Forgot Password v2',
    path: '/user/forgot-password-v2'
  }
]

export const EXCEPTION = [
  {
    name: '403 Error',
    path: '/app/exception/403'
  }, {
    name: '403 Error (Fullscreen)',
    path: '/exception/403'
  }, {
    name: '404 Error',
    path: '/app/exception/404'
  }, {
    name: '404 Error (Fullscreen)',
    path: '/exception/404'
  }, {
    name: '500 Error',
    path: '/app/exception/500'
  }, {
    name: '500 Error (Fullscreen)',
    path: '/exception/500'
  }, 
]


// for UI Overview page
const COMPONENTS = [
  ...CARDS,
  ...LAYOUTS,
  ...FOUNDATION,
  ...UIKIT, ...UIHOVER, ...UIICON, ...UIMORE, ...UINAVIGATION, ...UITIMELINE, ...UIUTILITY,
  ...FORMS, ...FORMCONTROLS,
  ...FEEDBACKS,
  ...TABELS,
  ...CHARTS,
  ...CALENDAR
];

export default COMPONENTS;

