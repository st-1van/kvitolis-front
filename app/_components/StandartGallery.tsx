import { getImageUrl } from '@/utils/api-helpers';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from "next/image";

export type ImageItemProps = {
  id: string;
  url: string;
  formats?: { large: { url: string } };
  alternativeText?: string;
};

export default function StandartGallery({ images }: { images: ImageItemProps[] }) {
  return (
    <div
      style={{
        overflowX: 'auto',
        maxWidth: '100%',
      }}
    >
      <ImageList
        cols={5}
        rowHeight={500}
        sx={{
          minWidth: '1440px',
        }}
      >
        {images.map((photo) => (
          <ImageListItem
            key={photo.id}
            sx={{ position: 'relative', width: '650px', height: '100%' }}
          >
            <Image
              src={getImageUrl(photo.url)}
              alt={photo.alternativeText || "Image"}
              fill={true}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
