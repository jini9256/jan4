import React from "react";
import styled from "@emotion/native";
import { getImgPath } from "../util";
import { useNavigation } from "@react-navigation/native";

const RatedCard = ({ movie }) => {
  const { navigate } = useNavigation();
  return (
    <VWrapper
      onPress={() =>
        navigate("Stacks", { screen: "Detail", params: { movieId: movie.id } })
      }
    >
      <TRPoster source={{ uri: getImgPath(movie.poster_path) }} />
      <TRColumn>
        <Rating>⭐️{movie.vote_average}/10</Rating>
        <TRTitle>
          {movie.title.slice(0, 11)}
          {movie.title.length > 11 && "..."}
        </TRTitle>
      </TRColumn>
    </VWrapper>
  );
};

export default RatedCard;
const TRPoster = styled.Image`
  width: 120px;
  height: 170px;
  background-color: grey;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;
const TRTitle = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: white;
`;
const VWrapper = styled.TouchableOpacity`
  background-color: black;
  border-radius: 5px;
  /* margin-right: 10px; */
`;
const TRColumn = styled.View`
  padding: 10px;
`;
const Rating = styled.Text`
  color: white;
  margin-top: 5px;
  margin-bottom: 5px;
`;
