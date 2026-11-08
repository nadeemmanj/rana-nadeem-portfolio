# public/ — photos

Is portfolio mein photos yahan se aati hain (SafeImage component ke zariye):

- /profile.jpg      → Hero section ki photo (already added)
- /about.jpg        → About section ki photo (already added)
- /projects/<slug>.jpg → har project ki thumbnail, misal /projects/mango-store.jpg
- /certificates/   → certificate images (filhal empty — SafeImage fallback dikhega)

Apni real photos add karni hon to bas same naam se file yahan rakh do —
koi code change nahi chahiye. Photo missing/broken ho to gradient +
emoji/initials wala fallback automatically dikhta hai.
