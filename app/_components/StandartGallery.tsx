import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from "next/image";

type ImageItem = {
  src: string;
  title: string;
};

export default function StandartGallery({ images }: { images: ImageItem[] }) {
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
        {images.map((item) => (
          <ImageListItem
            key={item.src}
            sx={{ position: 'relative', width: '100%', height: '100%' }}
          >
            <Image
              src={item.src}
              alt={item.title}
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
