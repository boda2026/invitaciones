const CONFIG = {
  names: {
    bride: 'Mariana Ailín',
    groom: 'Pablo Matías',
    brideFullName: 'Mariana Ailín Limarino',
  },

  password: 'fernetazo',

  weddingDate: '2026-10-10T18:00:00-03:00',

  event: {
    timeline: [
      { time: '18:15', label: 'Ingreso' },
      { time: '18:45', label: 'Ceremonia' },
      { time: '19:30', label: 'Fiesta' },
    ],
    venue: {
      name: 'Villa Carlos Paz',
      address: 'Av. Perito Moreno 1760',
      city: 'Country Altos de Carlos Paz, Córdoba',
      mapsUrl: 'https://maps.app.goo.gl/qtxSwoMXrxTWdYDj7',
    },
  },

  dressCode: 'Cocktail · Semiformal',

  playlist: {
    spotifyUrl: 'https://open.spotify.com/playlist/7vgeaLq7H23qs4Ox2wvUUm',
    embedUrl: 'https://open.spotify.com/embed/playlist/7vgeaLq7H23qs4Ox2wvUUm',
    text: 'Ayudanos a pensar qué música no puede faltar para este día tan especial.',
    subtext: 'Si tu sugerencia no está en Spotify, no dudes en avisarnos por mensaje.',
  },

  gift: {
    alias: 'bodayfernet',
    holder: 'Mariana Ailín Limarino',
    text: 'Tu presencia es nuestro mejor regalo, pero si deseas acompañarnos con un regalo, puedes colaborar con nuestra luna de miel.',
  },

  rsvp: {
    deadline: '15 de agosto de 2026',
    formUrl: 'https://forms.gle/wjAEywXSouF4FujH9',
  },

  music: {
    src: 'assets/music.mp3',
    autoplay: false,
    fadeTime: 1500,
  },

  galleryImages: [
    { src: 'assets/gallery/photo-01.jpg', alt: 'Mariana y Pablo' },
    { src: 'assets/gallery/photo-02.jpg', alt: 'Mariana y Pablo' },
    { src: 'assets/gallery/photo-03.jpg', alt: 'Mariana y Pablo' },
    { src: 'assets/gallery/photo-04.jpg', alt: 'Mariana y Pablo' },
    { src: 'assets/gallery/photo-05.jpg', alt: 'Mariana y Pablo' },
    { src: 'assets/gallery/photo-06.jpg', alt: 'Mariana y Pablo' },
    { src: 'assets/gallery/photo-07.jpg', alt: 'Mariana y Pablo' },
    { src: 'assets/gallery/photo-08.jpg', alt: 'Mariana y Pablo' },
    { src: 'assets/gallery/photo-09.jpg', alt: 'Mariana y Pablo' },
  ],

  particles: {
    count: 40,
    colors: ['#DABD9D', '#FEF9F3', '#ffffff'],
  },
};

export default CONFIG;
