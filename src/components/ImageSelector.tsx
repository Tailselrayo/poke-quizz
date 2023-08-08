import { PokedexCompleteData } from "@/types/PokedexCompleteData";
import { Carousel, Embla, useAnimationOffsetEffect } from "@mantine/carousel";
import { SimpleGrid, Stack } from "@mantine/core";
import { ImagePoke } from "./ImagePoke";
import { useState } from "react";
import { ImageSelectorArrows } from "./ImageSelectorArrows";

interface ImageSelectorProps {
    isAvatar?: boolean;
    userPokedex: PokedexCompleteData[];
    onImageSelect: (id: number) => void;
}

export function ImageSelector(props:ImageSelectorProps) {
    const [embla, setEmbla] = useState<Embla|null>(null)
    const [selectedPage, setSelectedPage] = useState(1);

    const pageNb = Math.ceil(props.userPokedex.length/18);

    const onArrowClick = (direction: string) => {
        if (direction === "Next") {
            embla?.scrollNext();
        }
        else if (direction==="Prev") {
            embla?.scrollPrev();
        }
        else {
            return;
        }
    }

    useAnimationOffsetEffect(embla, 300)

    return (
        <Stack align="center">
            <Carousel 
                maw={400}
                getEmblaApi={setEmbla}
                onSlideChange={(index)=>setSelectedPage(index+1)}
                withControls={false}
            >
                {Array.from({length: pageNb}).map((_,slideIndex)=>{
                    return(
                        <Carousel.Slide key={slideIndex}>
                            <SimpleGrid cols={6}>
                                {Array.from({length: 18}).map((_,badgeIndex)=>{
                                    let id = -1;
                                    if (badgeIndex+slideIndex*18<props.userPokedex.length) {
                                        id = props.userPokedex[badgeIndex+slideIndex*18]["poke-id"];
                                    }
                                    return(
                                        <ImagePoke 
                                            key={badgeIndex+slideIndex*18} 
                                            id={id} 
                                            src={props.isAvatar?process.env.NEXT_PUBLIC_POKESPRITE_URL:process.env.NEXT_PUBLIC_BADGESPRITE_URL} 
                                            onClick={()=>props.onImageSelect(id)}
                                            size={50}
                                        />
                                    )
                                })}
                            </SimpleGrid>
                        </Carousel.Slide>
                    )
                })}
            </Carousel>
            <ImageSelectorArrows 
                currentPage={selectedPage}
                totPages={pageNb}
                canGoNext={!!embla&&embla.canScrollNext()}
                canGoPrev={!!embla&&embla.canScrollPrev()}
                onClickNext={()=>onArrowClick("Next")}
                onClickPrev={()=>onArrowClick("Prev")}
            />
        </Stack>
    )
}