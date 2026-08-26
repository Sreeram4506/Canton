import os

replacements = {
    "src/components/home/shop.ts": [
        ('  "Classic & Muscle Car Restoration",\n', ''),
    ],
    "src/routes/__root.tsx": [
        ('diagnostics, and classic restoration', 'and diagnostics'),
    ],
    "src/routes/_layout/admin.tsx": [
        ('  { name: "Classic Restoration", value: 8, color: "#8b5cf6" },\n', ''),
        ('service: "Classic & Muscle Car Restoration"', 'service: "Auto Repair & Diagnostics"'),
    ],
    "src/routes/_layout/services/index.tsx": [
        ('classic car restoration, ', ''),
    ],
    "src/components/home/TrustMarquee.tsx": [
        ('  "Classic Car Restoration",\n', ''),
        ('classic car restoration, ', ''),
    ],
    "src/components/home/IntroSection.tsx": [
        ('classic car restoration, ', ''),
    ],
    "src/components/home/WhyUs.tsx": [
        ('and classic car restoration.', 'and auto body.'),
    ],
    "src/components/home/Services.tsx": [
        ('or a ground-up classic car\n              restoration, ', ''),
    ],
    "src/components/home/Testimonials.tsx": [
        ('Trusted with classic cars', 'Trusted with every car'),
        ('restoration', 'repair'),
    ],
    "src/components/home/Hero.tsx": [
        ('and classic car restoration', ''),
    ]
}

for filepath, reps in replacements.items():
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            content = f.read()
        for old, new in reps:
            content = content.replace(old, new)
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")
    else:
        print(f"File not found: {filepath}")

