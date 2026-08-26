import os
import glob

# Files to update
files = [
    "src/routes/_layout/why-us.tsx",
    "src/routes/_layout/reviews.tsx",
    "src/routes/_layout/index.tsx",
    "src/components/home/TrustMarquee.tsx",
    "src/components/home/Testimonials.tsx",
    "src/components/home/Stats.tsx",
    "src/components/home/WhyUs.tsx",
    "src/components/home/shop.ts",
    "src/components/home/Hero.tsx"
]

replacements = {
    "Yelp": "Google",
    "yelp": "google",
    "SHOP.yelpUrl": "SHOP.googleReviewsUrl",
    "reviewCount: 71": "reviewCount: 200",
    "reviewCount || 71": "reviewCount || 200"
}

for file in files:
    with open(file, 'r') as f:
        content = f.read()
    
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    with open(file, 'w') as f:
        f.write(content)

print("Updated files successfully.")
