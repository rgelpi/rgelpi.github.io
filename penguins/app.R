library(shiny)
library(bslib)
library(dplyr)
library(ggplot2)
library(ggExtra)

penguins_csv <- "https://raw.githubusercontent.com/jcheng5/simplepenguins.R/main/penguins.csv"

df <- readr::read_csv(penguins_csv)
# Find subset of columns that are suitable for scatter plot
df_num <- df |> select(where(is.numeric), -Year)

ui <- page_sidebar(
  sidebar = sidebar(
    varSelectInput("xvar", "X variable", df_num, selected = "Bill Length (mm)"),
    varSelectInput("yvar", "Y variable", df_num, selected = "Bill Depth (mm)"),
    checkboxInput("show_mean", "Show population mean"),
    hr(),
    checkboxGroupInput(
      "species", "Filter by species",
      choices = unique(df$Species), 
      selected = unique(df$Species)
    ),
    checkboxInput("by_species", "Show species"),
    checkboxGroupInput(
      "sex", "Filter by sex",
      choices = c("male", "female"), 
      selected = c("male", "female")
    ),
    checkboxInput("by_sex", "Show sex"),
    hr(),
    checkboxInput("smooth", "Linear trend"),
  ),
  plotOutput("scatter")
)

server <- function(input, output, session) {

  pop_mean <- reactive({
    req(input$species)
    req(input$sex)
    df_2 <- df |> 
      filter(Species %in% input$species, Sex %in% input$sex)
    mean_val = input$yvar
    mean(df_2[[mean_val]], na.rm = TRUE)
  })

  subsetted <- reactive({
    req(input$species)
    req(input$sex)
    df |> filter(Species %in% input$species, Sex %in% input$sex)
  })

  output$scatter <- renderPlot({
    p <- ggplot(subsetted(), aes(!!input$xvar, !!input$yvar)) + list(
      theme(legend.position = "bottom",
            panel.background = element_rect(colour = "grey",
              fill = "white"),
            panel.grid = element_line(colour = "grey"),
            axis.ticks = element_line(colour = "grey")),
      if (input$by_species) aes(color = Species),
      if (input$by_sex) aes(shape = Sex),
      geom_point(),
      if (input$smooth) geom_smooth(method = "lm"),
      if (input$show_mean) geom_hline(yintercept = pop_mean(),
      linetype = "dashed", color = "red", size = 1)
    )
    p
  }, res = 100)
}

shinyApp(ui, server)