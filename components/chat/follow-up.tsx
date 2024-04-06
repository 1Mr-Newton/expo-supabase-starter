import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { messageHolderStyle as styles } from "@/components/styles";

export const FollowUp = () => {
  const followUpTexts = [
    "Tell me more",
    "Can you explain that further?",
    "How did the Beatles infuse their signature style into the verse about scrumbled eggs?",
    "What are some vivid details used to describe the process of making scrumbled eggs in the verse?",
  ];
  return (
    <View style={styles.followUp}>
      {followUpTexts.map((text, index) => (
        <View key={index} style={{ width: "100%", marginBottom: 1 }}>
          <TouchableOpacity>
            <View style={{ width: "100%" }}>
              <Text
                style={{
                  backgroundColor: "#6d8bf8",
                  padding: 10,
                  width: "100%",
                  borderTopRightRadius: index === 0 ? 8 : 0,
                  borderTopLeftRadius: index === 0 ? 8 : 0,
                  borderBottomLeftRadius:
                    index === followUpTexts.length - 1 ? 8 : 0,
                  borderBottomRightRadius:
                    index === followUpTexts.length - 1 ? 8 : 0,
                  color: "white",
                }}
              >
                {text}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};
