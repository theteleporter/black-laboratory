# Avatar Microservice | Black Labs

This experiment demonstrates a simple microservice and a corresponding UI component for generating and displaying unique avatars based on user email. The microservice supports dynamic gradient creation, serves avatars in both `SVG` and `PNG` formats, and allows users to download them directly from the UI or it can be served to other applications by using the API endpoint.

## Features

- **Microservice**:
  - Generates unique avatars based on email using a hash-to-color algorithm.
  - Supports both `SVG` and `PNG` formats.
  - Caches responses for better performance.

- **UI Component**:
  - Displays the generated avatar in real time.
  - Allows users to input their email and preview avatars dynamically.
  - Provides options to download avatars in `SVG` or `PNG`.

---

## Microservice Implementation

The backend API is implemented as a `GET` route in Next.js. It generates a unique gradient-based avatar using the email provided as input.

### API Endpoints

#### `GET /api/avatar`
| **Query Parameters** | **Description**                                                | **Default** |
|-----------------------|----------------------------------------------------------------|-------------|
| `email`              | The email used to generate the avatar.                        | **Required**|
| `format`             | The output format of the avatar (`svg` or `png`).             | `png`       |

### Color Generation

The avatar colors are created using the **djb2 hash algorithm**:
1. Hashes the email to derive a base hue.
2. Generates two triadic hues for a complementary gradient.
3. Converts hues to **HSL** with high saturation and lightness for vibrant results.

---

## Frontend Component

The React component (`AvatarComponent`) handles the following:
1. Accepts user email input.
2. Dynamically updates the avatar preview based on the input.
3. Provides buttons to download the avatar in `SVG` or `PNG` format.

### Key Libraries

- **`next/image`**: Optimizes image loading and rendering.
- **Tailwind CSS**: Styles the UI for a clean, dark theme.
- **React State Hooks**: Manages email input and avatar URL updates.

---

### Example Avatars

Below are some sample avatars generated using the `/api/avatar` endpoint. These avatars are unique for each email provided.

| Example 1        | Example 2        | Example 3        | Example 4        | Example 5        |
|-------------------|------------------|------------------|------------------|------------------|
| ![Avatar 1](https://blacklabs.vercel.app/api/avatar?email=user81@example.com&format=png) | ![Avatar 2](http://blacklabs.vercel.app/api/avatar?email=user37@example.com&format=png) | ![Avatar 3](http://blacklabs.vercel.app/api/avatar?email=user57@example.com&format=png) | ![Avatar 4](http://blacklabs.vercel.app/api/avatar?email=user4@example.com&format=png) | ![Avatar 5](http://blacklabs.vercel.app/api/avatar?email=user58@example.com&format=png) |

---

## Contributing

We welcome contributions to this project and are excited to see your ideas and improvements!